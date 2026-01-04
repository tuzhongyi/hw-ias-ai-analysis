import { Injectable } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

import { Subscription } from 'rxjs';
import { SystemMainMapAlarmRealtimeController } from './system-main-map-alarm-realtime.controller';
import { SystemMainMapAlarmTimeoutController } from './system-main-map-alarm-timeout.controller';
import { SystemMainMapDeviceController } from './system-main-map-device.controller';
import { SystemMainMapHeatmapController } from './system-main-map-heatmap.controller';
import { SystemMainMapRoadController } from './system-main-map-road.controller';
import { SystemMainMapSampleController } from './system-main-map-sample.controller';
import { SystemMainMapShopController } from './system-main-map-shop.controller';

@Injectable()
export class SystemMainMapController {
  road: SystemMainMapRoadController;
  shop: SystemMainMapShopController;
  device: SystemMainMapDeviceController;
  alarm: {
    realtime: SystemMainMapAlarmRealtimeController;
    timeout: SystemMainMapAlarmTimeoutController;
  };
  sample: SystemMainMapSampleController;
  heatmap: SystemMainMapHeatmapController;
  constructor(tool: ComponentTool) {
    this.amap = new SystemMainMapAMapController(tool, this.subscription);
    this.road = new SystemMainMapRoadController(this.amap);
    this.shop = new SystemMainMapShopController(this.amap, this.subscription);
    this.device = new SystemMainMapDeviceController(
      this.amap,
      this.subscription
    );
    this.alarm = {
      realtime: new SystemMainMapAlarmRealtimeController(
        this.amap,
        this.subscription
      ),
      timeout: new SystemMainMapAlarmTimeoutController(
        this.amap,
        this.subscription
      ),
    };
    this.sample = new SystemMainMapSampleController(
      this.amap,
      this.subscription
    );
    this.heatmap = new SystemMainMapHeatmapController(this.amap);
  }

  private amap: SystemMainMapAMapController;
  private subscription = new Subscription();

  map = {
    moveto: (center: [number, number]) => {
      this.amap.map.get().then((x) => {
        x.setCenter(center);
        x.setZoom(20);
      });
    },
    focus: (datas?: any) => {
      this.amap.focus(datas);
    },
    destory: () => {
      let all = [
        this.road.destory(),
        this.shop.destory(),
        this.device.destory(),
        this.alarm.realtime.destory(),
        this.alarm.timeout.destory(),
        this.sample.destory(),
        this.heatmap.destory(),
      ];
      Promise.all(all).then(() => {
        this.amap.destory();
      });

      this.subscription.unsubscribe();
    },
  };
}
