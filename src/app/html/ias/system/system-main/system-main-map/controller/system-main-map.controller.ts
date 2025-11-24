import { Injectable } from '@angular/core';
import { ILocation } from '../../../../../../common/data-core/models/model.interface';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';
import { SystemMainMapAlarmController } from './system-main-map-alarm.controller';
import { SystemMainMapDeviceController } from './system-main-map-device.controller';
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
  constructor(tool: ComponentTool) {
    this.amap = new SystemMainMapAMapController(tool);
    this.road = new SystemMainMapRoadController(this.amap);
    this.shop = new SystemMainMapShopController(this.amap);
    this.device = new SystemMainMapDeviceController(this.amap);
    this.alarm = new SystemMainMapAlarmController(this.amap);
    this.sample = new SystemMainMapSampleController(this.amap);
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
      this.device.destory();
      this.alarm.destory();
      this.shop.destory();
    },
  };

  heatmap = {
    load: (datas: ILocation[]) => {
      this.amap.heatmap.get().then((x) => {
        x.load(datas);
      });
    },
    clear: () => {
      this.amap.heatmap.get().then((x) => {
        x.clear();
      });
    },
  };
}
