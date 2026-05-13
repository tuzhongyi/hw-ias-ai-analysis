import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import {
  GeoPoint,
  GeoPolyline,
} from '../../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import { IMapMarkerPath } from '../../../../../../../../common/tools/path-tool/path-map/marker/map-marker.interface';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { wait } from '../../../../../../../../common/tools/wait';
import { IASMapAMapConfig } from '../../ias-map-amap.config';
import { IASMapAMapPolylineEvent } from '../../marker/ias-map-amap-marker.model';
import { IASMapAMapPathHelper } from '../../path/ias-map-amap-path.helper';

export class IASMapAMapRoadObjectPolylineController {
  event = new IASMapAMapPolylineEvent<RoadObject>();

  constructor(private map: AMap.Map, private container: Loca.Container) {
    this.layer = {
      line: new Loca.LineLayer({
        loca: container,
        zooms: [0, 50],
      }),
      icon: new Loca.IconLayer({ zooms: IASMapAMapConfig.icon.zooms }),
    };
  }
  private over?: RoadObject;
  private loaded = false;
  private moving = false;
  private layer: {
    line: Loca.LineLayer;
    icon: Loca.IconLayer;
  };
  private style = {
    line: {
      color: (index: number, feature: any) => {
        let data = feature.properties as RoadObject;
        let hex = IASMapAMapPathHelper.color.from.road.object.state(
          data.ObjectState
        );
        let rgb = ColorTool.hex.to.rgb(hex);
        let alpha = 0.5;
        if (this.over) {
          if (data.Id == this.over.Id) {
            alpha = 1;
          }
        }
        return `rgba(${rgb.R}, ${rgb.G}, ${rgb.B}, ${alpha})`;
      },

      lineWidth: 4,
      altitude: 0,
    },
    point: {
      unit: 'px',
      icon: (index: number, feature: any) => {
        let args = feature.properties as {
          data: RoadObject;
          type: 'start' | 'end';
        };
        let data = args.data;
        let path: IMapMarkerPath;
        if (args.type == 'start') {
          path = PathTool.image.map.object.get(data.ObjectType, {
            state: data.ObjectState,
            start: true,
          });
        } else {
          path = PathTool.image.map.object.get(data.ObjectType, {
            state: data.ObjectState,
            start: false,
          });
        }
        if (this.over && this.over.Id == data.Id) {
          return path.hover;
        } else {
          return path.normal;
        }
      },
      iconSize: [48, 48],
      offset: [0, 0],
      rotation: 0,
    },
  };

  load(datas: RoadObject[]) {
    let polylines = datas.map<GeoPolyline>((item) => {
      let line = item.GeoLine ?? [];

      let polyline = line.map<GeoPoint>(
        (x, i) => [x.Longitude, x.Latitude] as [number, number]
      );
      return polyline;
    });

    this.loader.polyline(polylines, datas);
    this.loader.point(polylines, datas);
    this.loaded = true;
  }
  clear() {
    if (this.loaded) {
      this.over = undefined;
      this.container.animate.stop();
      this.layer.icon.remove();
      this.layer.line.remove();
      this.loaded = false;
    }
  }

  test(datas: RoadObject[]) {
    let polylines = datas.map<GeoPolyline>((item) => {
      let line = item.GeoLine ?? [];

      let polyline = line.map<GeoPoint>(
        (x) => [x.Longitude, x.Latitude] as [number, number]
      );
      return polyline;
    });
    let points = polylines.flat(1);
    let markers = points.map((x) => {
      return new AMap.Marker({ position: x });
    });
    this.map.add(markers);
  }

  click(position: [number, number]) {
    let data = this.query(position);

    if (data) {
      this.event.click.emit(data);
    }
  }
  dblclick(position: [number, number]) {
    let data = this.query(position);

    if (data) {
      this.event.dblclick.emit(data);
    }
  }

  private change(data?: RoadObject) {
    if (data) {
      if (this.over && this.over.Id == data.Id) {
        return false;
      }
      this.over = data;
      this.map.setDefaultCursor('pointer');
      return true;
    } else {
      if (this.over) {
        this.over = undefined;
        this.map.setDefaultCursor('default');
        return true;
      }
    }

    return false;
  }

  move(position: [number, number]) {
    wait(() => {
      return !this.moving;
    }).then(() => {
      this.moving = true;

      let data = this.query(position);
      let changed = this.change(data);

      if (changed) {
        let count = 3;

        setTimeout(() => {
          this.event.mouseover.emit(this.over);
          this.event.move.emit(this.over);
          count--;
          if (count === 0) this.moving = false;
        }, 0);

        setTimeout(() => {
          this.layer.line.setStyle({ ...this.style.line });
          count--;
          if (count === 0) this.moving = false;
        }, 0);

        setTimeout(() => {
          this.layer.icon.setStyle({ ...(this.style.point as any) });
          count--;
          if (count === 0) this.moving = false;
        }, 0);
      } else {
        this.moving = false;
      }
    });
  }

  private query(position: [number, number]): RoadObject | undefined {
    let point: any;

    point = this.layer.line.queryFeature(position);
    if (point) {
      return point?.properties;
    }

    point = this.layer.icon.queryFeature(position);
    if (point) {
      return point.properties.data;
    }
    return undefined;
  }

  private loader = {
    polyline: (polylines: GeoPolyline[], datas: RoadObject[]) => {
      let json: any = GeoTool.polyline.convert.json(polylines, datas);
      let geo = new Loca.GeoJSONSource({ data: json });
      this.layer.line.setSource(geo, this.style.line as any);
      this.container.animate.start();
    },
    point: (polylines: GeoPolyline[], datas: RoadObject[]) => {
      let points: GeoPoint[] = [];
      let _datas: { data: RoadObject; type: 'start' | 'end' }[] = [];
      for (let i = 0; i < polylines.length; i++) {
        const line = polylines[i];
        let start = line[0];
        points.push(start);
        _datas.push({ data: datas[i], type: 'start' });

        let end = line[line.length - 1];
        points.push(end);
        _datas.push({ data: datas[i], type: 'end' });
      }
      let json: any = GeoTool.point.convert.json.points(points, _datas);
      let geo = new Loca.GeoJSONSource({ data: json });
      this.layer.icon.setSource(geo, this.style.point as any);
      this.layer.icon.setLoca(this.container);
    },
  };
}
