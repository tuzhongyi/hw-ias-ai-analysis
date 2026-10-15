import { RoadArea } from '../../../../../../../../../common/data-core/models/arm/geographic/road-area.model';

/**
 * 详情地图上的「已有区域」参考层：新建区域时，把已有区域淡淡地铺在底下当参照。
 *
 * 只做参照：不挂 PolygonEditor（拖不动、改不了顶点），也不留 click 回调（点了没反应）。
 * 但必须 bubble，否则它会把 click / mousemove 吃掉，在已有区域上面就画不上新区域了。
 */
export class SystemModuleRoadAreaDetailsMapAMapAreasController {
  constructor(private map: AMap.Map) {}

  private polygons = new Map<string, AMap.Polygon>();

  private create(datas: [number, number][]) {
    // @amap/amap-jsapi-types 里 Polygon 漏了构造函数声明（Polyline 有），这里绕过
    return new (AMap.Polygon as any)({
      path: datas,
      strokeColor: '#cccccc',
      strokeWeight: 2,
      strokeOpacity: 0.6,
      // 多边形样式还可以为'dashed'
      strokeStyle: 'solid',
      fillColor: '#cccccc',
      fillOpacity: 0.15,
      bubble: true,
      // 压在正在绘制的图形下面（预览 9、成品用默认 10）
      zIndex: 1,
    } satisfies AMap.PolygonOptions);
  }

  load(datas: RoadArea[]) {
    this.clear();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.Area && item.Area.length > 0) {
        let positions = item.Area.map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        this.polygons.set(item.Id, this.create(positions));
      }
    }

    if (this.polygons.size > 0) {
      this.map.add(Array.from(this.polygons.values()));
    }
  }
  clear() {
    if (this.polygons.size > 0) {
      this.map.remove(Array.from(this.polygons.values()));
      this.polygons.clear();
    }
  }
}
