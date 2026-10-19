import { EventEmitter, Injectable } from '@angular/core';
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
  private last = new LastResortTool();

  /**
   * 最后一次由数据接管视野的动作。城市兜底是异步落地的
   * （setCity 要先把城市边界拉回来再摆视野），可能晚于数据的 fitView，
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
    let map = await this.map.get();
    let polygon = await this.polygon.get();

    polygon.clear();
    this.datas.clear();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.Area) {
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

    // 一个多边形都没画出来的话别动视野：setFitView() 自适应不到任何东西，
    // 却会把城市兜底 claim 掉，地图就停在空白上再也回不来
    if (this.datas.size == 0) {
      return;
    }

    // 数据接管视野：顺手把「怎么摆回这批区域」交给城市兜底，
    // setCity 晚一步落地时靠它把视野抢回来
    let from = () => {
      map.setFitView();
    };
    this.claim(from);
    from();

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
    this.map.get().then((x) => {
      // 同上：没有多边形可自适应时别动视野，也别 claim
      if (this.datas.size == 0) return;

      // 数据接管视野：顺手把「怎么摆回这批区域」交给城市兜底
      let from = () => {
        x.setFitView(datas, true);

        let center = x.getCenter();

        x.setZoom(17);
        x.setPitch(40);
        x.setCenter(center);
      };
      this.claim(from);
      from();
    });
  }
  city(value: string) {
    this.last.fallback(() => {
      this.map.get().then((x) => {
        // 等地图的这些时间里，可能已经有别的数据接管了视野
        if (this.last.claimed) return;
        x.setCity(value, () => {
          // setCity 的回调同样可能落在数据的 fitView 之后 ——
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
