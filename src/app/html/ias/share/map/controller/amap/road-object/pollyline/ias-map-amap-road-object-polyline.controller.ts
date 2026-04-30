import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import {
  GeoPoint,
  GeoPolyline,
} from '../../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapPolylineEvent } from '../../marker/ias-map-amap-marker.model';
import { IASMapAMapPathHelper } from '../../path/ias-map-amap-path.helper';

export class IASMapAMapRoadObjectPolylineController {
  event = new IASMapAMapPolylineEvent<RoadObject>();

  constructor(private map: AMap.Map, private container: Loca.Container) {
    this.layer = {
      line: this.init(container),
      point: new Loca.IconLayer({ zooms: [0, 50] }),
    };
  }
  private over?: RoadObject;
  private loaded = false;
  private layer: {
    line: Loca.LineLayer;
    point: Loca.IconLayer;
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
      // dash: [10, 4, 10, 2],
    },
    point: {
      unit: 'px',
      icon: function (index: number, feature: any) {
        let data = feature.properties as {
          data: RoadObject;
          type: 'start' | 'end';
        };
        if (data.type == 'start') {
          return PathTool.image.map.start;
        } else {
          return PathTool.image.map.end;
        }
      },
      opacity: (index: number, feature: any) => {
        if (this.over) {
          let data = feature.properties as {
            data: RoadObject;
            type: 'start' | 'end';
          };
          if (data.data.Id == this.over.Id) {
            return 1;
          }
        }
        return 0.8;
      },
      iconSize: [48, 48],
      offset: [0, 0],
      rotation: 0,
    },
  };

  private init(container: Loca.Container) {
    return new Loca.LineLayer({
      loca: container,
      zooms: [0, 50],
    });
  }

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
      this.container.animate.stop();
      // this.point.remove();
      this.layer.point.remove();
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

  moving(position: [number, number]) {
    let data = this.query(position);

    if (data) {
      this.over = data;
      this.event.mouseover.emit(this.over);
      this.event.move.emit(this.over);
      this.map.setDefaultCursor('pointer');
      this.layer.line.setStyle(this.style.line);
      this.layer.point.setStyle(this.style.point as any);
    } else {
      if (this.over) {
        this.over = undefined;
        this.event.mouseout.emit();
        this.event.move.emit();
        this.map.setDefaultCursor('default');
        this.layer.line.setStyle(this.style.line);
        this.layer.point.setStyle(this.style.point as any);
      }
    }
  }

  private query(position: [number, number]): RoadObject | undefined {
    let point: any;

    point = this.layer.line.queryFeature(position);
    if (point) {
      return point?.properties;
    }

    point = this.layer.point.queryFeature(position);
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
      this.layer.point.setSource(geo, this.style.point as any);
      this.layer.point.setLoca(this.container);
    },
  };
}
