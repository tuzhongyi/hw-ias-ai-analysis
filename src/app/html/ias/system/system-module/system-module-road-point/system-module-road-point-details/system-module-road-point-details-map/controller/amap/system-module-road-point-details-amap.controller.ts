import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { Division } from '../../../../../../../../../common/data-core/models/arm/division/division.model';
import { AMapCityLocator } from '../../../../../../../../../common/helper/map/amap.helper';
import { LastResortTool } from '../../../../../../../../../common/tools/last-resort-tool/last-resort.tool';
import { IASMapAMapRoadController } from '../../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemAMapCircleEditorController } from '../../../../../../system-map/component/controller/amap/circle/system-map-amap-circle-editor.controller';

export class SystemModuleRoadPointDetailsAMapController {
  event = {
    circel: {
      change: new EventEmitter<number>(),
      move: new EventEmitter<[number, number]>(),
    },
    /** 城市兜底真的落地了，带落地后的地图中心 —— 圆和坐标要跟着摆过去 */
    city: new EventEmitter<[number, number]>(),
    /** 双击地图，带双击点的坐标 —— 用来把可编辑圆的圆心挪过去 */
    dblclick: new EventEmitter<[number, number]>(),
  };
  map = new PromiseValue<AMap.Map>();
  circle = new PromiseValue<SystemAMapCircleEditorController>();
  road = new PromiseValue<IASMapAMapRoadController>();

  constructor(private subscription: Subscription) {
    MapHelper.amap
      .get(
        'system-module-road-point-details-map',
        ['AMap.CircleEditor', 'AMap.Adaptor'],
        true,
        {
          // 双击默认会以双击点为锚点放大一级。这里双击的语义是
          // 「把可编辑圆的圆心放到这个点」，再顺带放大一下就没法瞄准了
          doubleClickZoom: false,
        }
      )
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        x.setZoom(17);

        x.on('dblclick', (e) => {
          this.event.dblclick.emit([e.lnglat.lng, e.lnglat.lat]);
        });

        let container = this.init.map(x);
        this.init.road(x, container);
        this.init.circle(x);
      });
    this.regist();
  }

  private init = {
    map: (map: AMap.Map) => {
      this.map.set(map);
      let container = new Loca.Container({ map });
      return container;
    },
    circle: (map: AMap.Map) => {
      let ctr = new SystemAMapCircleEditorController(map);
      // 这个圆只是先备好，圆心等地址定位 / 城市兜底落地后由 set() 摆正；
      // 此处不能让 create 里的 setFitView 抢视野，否则地图先跳到这个莫名其妙的圆上
      ctr.circle.create(undefined, false);
      this.circle.set(ctr);
    },
    road: (map: AMap.Map, container: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, container);
      this.road.set(ctr);
    },
  };
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
          this.settle(x, 0);
        });
      });
    });
  }
  /**
   * 等视野真的停下来：定位的回调可能早于它自己的 setBounds/setZoom 生效，
   * 那时 getCenter() 还是旧中心。中心连续两次不动才算落地
   */
  private settle(map: AMap.Map, times: number) {
    let before = map.getCenter();
    setTimeout(() => {
      let after = map.getCenter();
      let moved = before.lng != after.lng || before.lat != after.lat;
      if (moved && times < 10) {
        this.settle(map, times + 1);
        return;
      }
      this.event.city.emit([after.lng, after.lat]);
    }, 200);
  }

  private regist() {
    this.circle.get().then((ctr) => {
      let sub_1 = ctr.event.change.subscribe((x) => {
        this.event.circel.change.emit(x);
      });
      this.subscription.add(sub_1);
      let sub_2 = ctr.event.move.subscribe((x) => {
        this.event.circel.move.emit(x);
      });
      this.subscription.add(sub_2);
    });
  }
}
