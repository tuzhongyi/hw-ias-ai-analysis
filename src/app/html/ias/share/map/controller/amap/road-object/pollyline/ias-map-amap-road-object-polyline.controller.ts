import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import {
  GeoPoint,
  GeoPolyline,
} from '../../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapConfig } from '../../ias-map-amap.config';
import { IASMapAMapPolylineEvent } from '../../marker/ias-map-amap-marker.model';
import { IASMapAMapPathHelper } from '../../path/ias-map-amap-path.helper';
export class IASMapAMapRoadObjectPolylineController {
  event = new IASMapAMapPolylineEvent<RoadObject>();

  private over?: RoadObject;

  private loaded = false;

  /**
   * move 串行
   */
  private moveQueue: Promise<void> = Promise.resolve();

  private layer: {
    line: Loca.LineLayer;

    /**
     * 普通 icon
     */
    icon: Loca.IconLayer;

    /**
     * hover icon
     */
    hoverIcon: Loca.IconLayer;
  };

  constructor(private map: AMap.Map, private container: Loca.Container) {
    this.layer = {
      /**
       * line
       */
      line: new Loca.LineLayer({
        loca: container,
        zooms: [0, 50],
      }),

      /**
       * normal icon
       */
      icon: new Loca.IconLayer({
        zooms: IASMapAMapConfig.icon.zooms,
      }),

      /**
       * hover icon
       */
      hoverIcon: new Loca.IconLayer({
        zooms: IASMapAMapConfig.icon.zooms,
      }),
    };

    /**
     * 必须绑定 loca
     */
    this.layer.icon.setLoca(this.container);

    this.layer.hoverIcon.setLoca(this.container);
  }

  //#region public

  load(datas: RoadObject[]) {
    const polylines = datas.map<GeoPolyline>((item) => {
      const line = item.GeoLine ?? [];

      return line.map<GeoPoint>((x) => [x.Longitude, x.Latitude] as GeoPoint);
    });

    this.loader.polyline(polylines, datas);

    this.loader.point(polylines, datas);

    this.loaded = true;
  }

  clear() {
    if (!this.loaded) return;

    this.over = undefined;

    this.container.animate.stop();

    this.layer.line.remove();

    this.layer.icon.remove();

    this.layer.hoverIcon.remove();

    this.loaded = false;
  }

  click(position: [number, number]) {
    const data = this.query(position);

    if (data) {
      this.event.click.emit(data);
    }
  }

  dblclick(position: [number, number]) {
    const data = this.query(position);

    if (data) {
      this.event.dblclick.emit(data);
    }
  }

  move(position: [number, number]) {
    this.moveQueue = this.moveQueue
      .then(() => this.renderMove(position))
      .catch(console.error);

    return this.moveQueue;
  }

  //#endregion

  //#region move

  private async renderMove(position: [number, number]) {
    const data = this.query(position);

    const changed = this.change(data);

    if (!changed) {
      return;
    }

    /**
     * 更新 line hover
     */
    this.layer.line.setStyle(this.createLineStyle(this.over?.Id) as any);

    /**
     * 更新 hover icon layer
     */
    this.updateHoverIconLayer(this.over);

    /**
     * event
     */
    this.event.mouseover.emit(this.over);

    this.event.move.emit(this.over);

    /**
     * 等待一帧
     */
    await this.nextFrame();
  }

  private nextFrame() {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  }

  //#endregion

  //#region style

  /**
   * line style
   */
  private createLineStyle(overId?: string) {
    return {
      color: (index: number, feature: any) => {
        const data = feature.properties as RoadObject;

        const hex = IASMapAMapPathHelper.color.from.road.object.state(
          data.ObjectState
        );

        const rgb = ColorTool.hex.to.rgb(hex);

        const alpha = overId && data.Id === overId ? 1 : 0.5;

        return `rgba(${rgb.R}, ${rgb.G}, ${rgb.B}, ${alpha})`;
      },

      lineWidth: 4,

      altitude: 0,
    };
  }

  /**
   * 普通 icon style
   */
  private createPointStyle() {
    return {
      unit: 'px',

      icon: (index: number, feature: any) => {
        const args = feature.properties as {
          data: RoadObject;
          type: 'start' | 'end';
        };

        const data = args.data;

        const path = PathTool.image.map.object.get(data.ObjectType, {
          state: data.ObjectState,

          start: args.type === 'start',
        });

        /**
         * 永远 normal
         */
        return path.normal;
      },

      iconSize: [48, 48],

      offset: [0, 0],

      rotation: 0,
    };
  }

  /**
   * hover icon style
   */
  private createHoverPointStyle() {
    return {
      unit: 'px',

      icon: (index: number, feature: any) => {
        const args = feature.properties as {
          data: RoadObject;
          type: 'start' | 'end';
        };

        const data = args.data;

        const path = PathTool.image.map.object.get(data.ObjectType, {
          state: data.ObjectState,

          start: args.type === 'start',
        });

        /**
         * 永远 hover
         */
        return path.hover;
      },

      iconSize: [48, 48],

      offset: [0, 0],

      rotation: 0,
    };
  }

  //#endregion

  //#region state

  private change(data?: RoadObject) {
    /**
     * 同对象
     */
    if (data) {
      if (this.over && this.over.Id === data.Id) {
        return false;
      }

      this.over = data;

      this.map.setDefaultCursor('pointer');

      return true;
    }

    /**
     * clear
     */
    if (this.over) {
      this.over = undefined;

      this.map.setDefaultCursor('default');

      return true;
    }

    return false;
  }

  //#endregion

  //#region query

  private query(position: [number, number]): RoadObject | undefined {
    let point: any;

    /**
     * icon 优先
     */
    point = this.layer.hoverIcon.queryFeature(position);

    if (point) {
      return point.properties.data;
    }

    point = this.layer.icon.queryFeature(position);

    if (point) {
      return point.properties.data;
    }

    point = this.layer.line.queryFeature(position);

    if (point) {
      return point.properties;
    }

    return undefined;
  }

  //#endregion

  //#region hover layer

  private updateHoverIconLayer(data?: RoadObject) {
    /**
     * clear hover
     */
    if (!data) {
      const geo = new Loca.GeoJSONSource({
        data: {
          type: 'FeatureCollection',

          features: [],
        },
      });

      this.layer.hoverIcon.setSource(geo, this.createHoverPointStyle() as any);

      return;
    }

    const line = data.GeoLine ?? [];

    if (!line.length) {
      return;
    }

    const start = line[0];

    const end = line[line.length - 1];

    const points: GeoPoint[] = [
      [start.Longitude, start.Latitude],

      [end.Longitude, end.Latitude],
    ];

    const datas = [
      {
        data,
        type: 'start' as const,
      },

      {
        data,
        type: 'end' as const,
      },
    ];

    const json: any = GeoTool.point.convert.json.points(points, datas);

    const geo = new Loca.GeoJSONSource({
      data: json,
    });

    this.layer.hoverIcon.setSource(geo, this.createHoverPointStyle() as any);
  }

  //#endregion

  //#region loader

  private loader = {
    /**
     * line
     */
    polyline: (polylines: GeoPolyline[], datas: RoadObject[]) => {
      const json: any = GeoTool.polyline.convert.json(polylines, datas);

      const geo = new Loca.GeoJSONSource({
        data: json,
      });

      this.layer.line.setSource(geo, this.createLineStyle() as any);

      this.container.animate.start();
    },

    /**
     * normal icon
     */
    point: (polylines: GeoPolyline[], datas: RoadObject[]) => {
      const points: GeoPoint[] = [];

      const _datas: {
        data: RoadObject;
        type: 'start' | 'end';
      }[] = [];

      for (let i = 0; i < polylines.length; i++) {
        const line = polylines[i];

        /**
         * start
         */
        const start = line[0];

        points.push(start);

        _datas.push({
          data: datas[i],
          type: 'start',
        });

        /**
         * end
         */
        const end = line[line.length - 1];

        points.push(end);

        _datas.push({
          data: datas[i],
          type: 'end',
        });
      }

      const json: any = GeoTool.point.convert.json.points(points, _datas);

      const geo = new Loca.GeoJSONSource({
        data: json,
      });

      this.layer.icon.setSource(geo, this.createPointStyle() as any);
    },
  };

  //#endregion
}
