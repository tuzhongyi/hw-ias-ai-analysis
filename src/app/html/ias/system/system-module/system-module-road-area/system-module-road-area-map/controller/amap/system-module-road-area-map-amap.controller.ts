import { EventEmitter, Injectable } from '@angular/core';
import { Division } from '../../../../../../../../common/data-core/models/arm/division/division.model';
import { AMapCityLocator } from '../../../../../../../../common/helper/map/amap.helper';
import { RoadArea } from '../../../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { LastResortTool } from '../../../../../../../../common/tools/last-resort-tool/last-resort.tool';

import { SystemModuleRoadAreaMapAMapPolygonController } from './system-module-road-area-map-amap-polygon.controller';

@Injectable()
export class SystemModuleRoadAreaMapAMapController {
  event = {
    mousemove: new EventEmitter<[number, number]>(),
    mouseout: new EventEmitter<void>(),
    change: new EventEmitter<[number, number][]>(),
    click: new EventEmitter<[number, number]>(),
    area: {
      click: new EventEmitter<RoadArea>(),
    },
  };

  road = new PromiseValue<IASMapAMapRoadController>();
  constructor() {
    this.init();
  }

  private init() {
    MapHelper.amap
      .get('system-module-road-area-map', undefined, true)
      .then((map) => {
        map.setZoom(17);
        let container = new Loca.Container({ map: map });
        this.map.set(map);
        this.regist(map);
        // 地图资源（瓦片）加载完之前调 setFitView 会被静默丢掉 —— 首次进入时
        // 区域数据往往比地图先回来，被丢掉的就是第一次定位。等 complete 再摆
        map.on('complete', () => {
          this.completed = true;
          let pending = this.pending;
          this.pending = undefined;
          pending?.();
        });
        let polygon = new SystemModuleRoadAreaMapAMapPolygonController(map);
        this.polygon.set(polygon);

        polygon.event.click.subscribe((id) => {
          let data = this.datas.get(id);
          if (data) {
            this.event.area.click.emit(data);
          }
        });

        let road = new IASMapAMapRoadController(map, container);
        this.road.set(road);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private polygon =
    new PromiseValue<SystemModuleRoadAreaMapAMapPolygonController>();
  /** 已画出来的区域，点中多边形后用 id 找回它 */
  private datas = new Map<string, RoadArea>();
  /** 路网折线。区域没几何时，它是第二顺位的定位目标 */
  private roads: AMap.Polyline[] = [];
  private last = new LastResortTool();

  /**
   * 最后一次由数据接管视野的动作。城市兜底是异步落地的
   * （城市或区划边界要异步查回来再摆视野），可能晚于数据的 fitView，
   * 那时就把视野再摆回去。
   */
  private takeover?: () => void;

  /** 视野已被数据接管 → 取消城市兜底。传 restore 就顺手记住怎么把视野摆回来 */
  claim(restore?: () => void) {
    this.last.claim();
    if (restore) {
      this.takeover = restore;
    }
  }

  /** 地图资源是否已加载完成 */
  private completed = false;
  /** 地图还没加载完时，先存下「该怎么摆视野」，等 complete 再执行 */
  private pending?: () => void;

  private deferred(from: () => void) {
    if (this.completed) {
      from();
      return;
    }
    this.pending = from;
    // complete 一直不来（瓦片被挡、离线）也不能永远不定位，兜一次底
    setTimeout(() => {
      if (this.pending === from) {
        this.pending = undefined;
        from();
      }
    }, 1.5 * 1000);
  }

  private regist(map: AMap.Map) {
    map.on('mousemove', (e) => {
      this.event.mousemove.emit([e.lnglat.lng, e.lnglat.lat]);
    });
    map.on('mouseout', () => {
      this.event.mouseout.emit();
    });
    map.on('click', (e) => {
      this.event.click.emit([e.lnglat.lng, e.lnglat.lat]);
    });
  }

  async load(datas: RoadArea[], fit = true) {
    let polygon = await this.polygon.get();

    polygon.clear();
    this.datas.clear();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      // 少于 3 个点构不成多边形：画不出来，也不能拿它去定视野
      // （空 path 的多边形会让 setFitView 算出一块无效范围）
      if (item.Area && item.Area.length >= 3) {
        let positions = item.Area.map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        this.datas.set(item.Id, item);
        polygon.add(item.Id, positions);
      }
    }

    // 重画多边形总是要做（被删掉的那个得从地图上消失），但视野动不动由调用方决定
    if (!fit) {
      return;
    }

    this.locate();
  }

  /**
   * 路网画好了。区域没几何（没有数据，或数据里没有 Area）时，
   * 路网顶上做第二顺位的定位目标；区域有几何的话 load() 已经定过位，不用再动
   */
  roadloaded(polylines: AMap.Polyline[]) {
    this.roads = polylines ?? [];
    if (this.datas.size == 0) {
      this.locate();
    }
  }

  /**
   * 定视野的优先级：区域 → 路网 → 城市兜底。
   * 两者都没有就不动视野，把位置留给城市兜底。
   */
  private async locate() {
    let map = await this.map.get();
    let polygon = await this.polygon.get();

    // 目标放到执行时再算：complete 回调、1.5s 兜底这些时点上，
    // 区域和路网可能已经换过一批了
    let target = () => {
      return this.datas.size > 0 ? polygon.all() : this.roads;
    };
    if (target().length == 0) {
      return;
    }

    // 数据接管视野：顺手把「怎么摆回这批数据」交给城市兜底，
    // 区划兜底晚一步落地时靠它把视野抢回来。
    // 只传自己画的那批：无参数的 setFitView() 会把路网也算进去，路网有数据时会把视野拉到整张路网。
    // immediately 必须给：默认是带动画的，动画途中只要别的东西碰一下地图
    //（城市兜底、容器尺寸变化）就会被截断在半路，看着就像「视野没变」
    let from = () => {
      let overlays = target();
      if (overlays.length > 0) {
        map.setFitView(overlays, true);
      }
    };
    this.claim(from);
    this.deferred(from);

    // 城市兜底可能晚一步才真正落地，落地后再摆回来
    setTimeout(() => {
      from();
    }, 1.5 * 1000);
  }

  select(id: string) {
    this.polygon.get().then((polygon) => {
      polygon.select(id);
    });
  }
  blur() {
    this.polygon.get().then((polygon) => {
      polygon.blur();
    });
  }
  focus(datas?: any) {
    Promise.all([this.map.get(), this.polygon.get()]).then(
      ([map, polygon]) => {
        // 同上：没有多边形可自适应时别动视野，也别 claim
        if (this.datas.size == 0) return;

        // 数据接管视野：顺手把「怎么摆回这批区域」交给城市兜底
        let from = () => {
          // 有明确目标就按目标，否则只按区域，不算路网
          map.setFitView(datas ?? polygon.all(), true);

          let center = map.getCenter();

          map.setZoom(17);
          map.setPitch(40);
          map.setCenter(center);
        };
        this.claim(from);
        this.deferred(from);
      },
    );
  }
  city(division: Division, locator?: AMapCityLocator) {
    this.last.fallback(() => {
      this.map.get().then((x) => {
        // 等地图的这些时间里，可能已经有别的数据接管了视野
        if (this.last.claimed) return;
        MapHelper.amap.city(x, division, locator, () => {
          // 定位的回调同样可能落在数据的 fitView 之后 ——
          // 那就说明视野已经被数据接管了，把地图还给数据，别再往城市上摆
          if (this.last.claimed) {
            this.takeover?.();
            return;
          }
          x.setZoom(17);
        });
      });
    });
  }
  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
