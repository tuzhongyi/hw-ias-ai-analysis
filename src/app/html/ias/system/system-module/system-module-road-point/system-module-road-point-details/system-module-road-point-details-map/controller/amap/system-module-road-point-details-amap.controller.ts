import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { LastResortTool } from '../../../../../../../../../common/tools/last-resort-tool/last-resort.tool';
import { IASMapAMapRoadController } from '../../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemAMapCircleEditorController } from '../../../../../../system-map/component/controller/amap/circle/system-map-amap-circle-editor.controller';

export class SystemModuleRoadPointDetailsAMapController {
  event = {
    circel: {
      change: new EventEmitter<number>(),
      move: new EventEmitter<[number, number]>(),
    },
  };
  map = new PromiseValue<AMap.Map>();
  circle = new PromiseValue<SystemAMapCircleEditorController>();
  road = new PromiseValue<IASMapAMapRoadController>();

  constructor(private subscription: Subscription) {
    MapHelper.amap
      .get(
        'system-module-road-point-details-map',
        ['AMap.CircleEditor', 'AMap.Adaptor'],
        true
      )
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        x.setZoom(17);

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
      ctr.circle.create();
      this.circle.set(ctr);
    },
    road: (map: AMap.Map, container: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, container);
      this.road.set(ctr);
    },
  };
  private last = new LastResortTool();

  /** 视野已被数据接管 → 取消城市兜底 */
  claim() {
    this.last.claim();
  }

  city(value: string) {
    this.last.fallback(() => {
      this.map.get().then((x) => {
        // 等地图的这些时间里，可能已经有别的数据接管了视野
        if (this.last.claimed) return;
        x.setCity(value, () => {
          x.setZoom(17);
        });
      });
    });
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
