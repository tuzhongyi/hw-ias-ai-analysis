import { Injectable } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';
import { SystemMainMapAlarmController } from './system-main-map-alarm.controller';
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
  alarm: SystemMainMapAlarmController;
  sample: SystemMainMapSampleController;
  heatmap: SystemMainMapHeatmapController;
  constructor(tool: ComponentTool) {
    this.amap = new SystemMainMapAMapController(tool);
    this.road = new SystemMainMapRoadController(this.amap);
    this.shop = new SystemMainMapShopController(this.amap);
    this.device = new SystemMainMapDeviceController(this.amap);
    this.alarm = new SystemMainMapAlarmController(this.amap);
    this.sample = new SystemMainMapSampleController(this.amap);
    this.heatmap = new SystemMainMapHeatmapController(this.amap);
  }

  private amap: SystemMainMapAMapController;

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
        this.alarm.destory(),
        this.sample.destory(),
        this.heatmap.destory(),
      ];
      Promise.all(all).then(() => {
        this.amap.destory();
      });
    },
  };
}
