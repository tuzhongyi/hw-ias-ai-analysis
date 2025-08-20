import { Injectable } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';
import { SystemMainMapAlarmController } from './system-main-map-alarm.controller';
import { SystemMainMapDeviceController } from './system-main-map-device.controller';
import { SystemMainMapRoadController } from './system-main-map-road.controller';
import { SystemMainMapShopController } from './system-main-map-shop.controller';

@Injectable()
export class SystemMainMapController {
  road: SystemMainMapRoadController;
  shop: SystemMainMapShopController;
  device: SystemMainMapDeviceController;
  alarm: SystemMainMapAlarmController;
  constructor(tool: ComponentTool) {
    this.amap = new SystemMainMapAMapController(tool);
    this.road = new SystemMainMapRoadController(this.amap);
    this.shop = new SystemMainMapShopController(this.amap);
    this.device = new SystemMainMapDeviceController(this.amap);
    this.alarm = new SystemMainMapAlarmController(this.amap);
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
      this.amap.destory();
    },
  };
}
