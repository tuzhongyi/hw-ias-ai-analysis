import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { ComponentTool } from '../../../../../../../common/tools/component-tool/component.tool';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapPointLayerController } from '../../../../../share/map/controller/amap/point/ias-map-amap-point-layer.controller';
import { IASMapAMapRoadController } from '../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemMainMapAMapDeviceMarkerLayerController } from './device/system-main-map-amap-device-marker-layer.controller';

import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { Paged } from '../../../../../../../common/data-core/models/page-list.model';
import { SystemMainMapAMapAlarmInfoController } from './alarm/system-main-map-amap-alarm-info.controller';
import { SystemMainMapAMapAlarmMarkerLayerController } from './alarm/system-main-map-amap-alarm-marker-layer.controller';
import { SystemMainMapAMapAlarmScatterController } from './alarm/system-main-map-amap-alarm-scatter.controller';
import { SystemMainMapAMapHeatmapController } from './heatmap/system-main-map-amap-heatmap.controller';
import { SystemMainMapAMapSampleMarkerLayerController } from './sample/system-main-map-amap-sample-marker-layer.controller';
import { SystemMainMapAMapSampleScatterController } from './sample/system-main-map-amap-sample-scatter.controller';
import { SystemMainMapAMapShopMarkerLayerController } from './shop/system-main-map-amap-shop-marker-layer.controller';

export class SystemMainMapAMapController {
  get shop() {
    return this.controller.shop;
  }
  get road() {
    return this.controller.road;
  }
  get device() {
    return this.controller.device;
  }
  get alarm() {
    return this.controller.alarm;
  }
  get sample() {
    return this.controller.sample;
  }
  get heatmap() {
    return this.controller.heatmap;
  }
  map = new PromiseValue<AMap.Map>();
  event = {
    shop: {
      click: new EventEmitter<IShop>(),
      dblclick: new EventEmitter<IShop>(),
    },
    alarm: {
      video: new EventEmitter<MobileEventRecord>(),
      picture: new EventEmitter<Paged<MobileEventRecord>>(),
    },
    sample: {
      dblclick: new EventEmitter<GpsTaskSampleRecord>(),
    },
  };

  constructor(private tool: ComponentTool) {
    MapHelper.amap
      .get('system-main-map-container', [], true, {
        viewMode: '3D',
      })
      .then((map) => {
        map.setFeatures(['bg', 'road', 'building']);
        this.init.map(map);
        let container = new Loca.Container({ map: map });
        this.loca.set(container);
        container.animate.start();

        this.init.road(map, container);
        this.init.heatmap(container);

        let info = this.init.info(map);

        this.init.shop.point(container);
        this.init.shop.marker(map, info);

        this.init.device.marker(map, info);

        this.init.alarm.scatter(container);
        this.init.alarm.info(map);
        this.init.alarm.marker(map, info);

        this.init.sample.scatter(container);
        this.init.sample.marker(map, info);
      });
  }

  private loca = new PromiseValue<Loca.Container>();
  private controller = {
    shop: {
      point: new PromiseValue<IASMapAMapPointLayerController>(),
      marker: new PromiseValue<SystemMainMapAMapShopMarkerLayerController>(),
    },
    device: {
      marker: new PromiseValue<SystemMainMapAMapDeviceMarkerLayerController>(),
    },
    alarm: {
      info: new PromiseValue<SystemMainMapAMapAlarmInfoController>(),
      scatter: new PromiseValue<SystemMainMapAMapAlarmScatterController>(),
      marker: new PromiseValue<SystemMainMapAMapAlarmMarkerLayerController>(),
    },
    sample: {
      scatter: new PromiseValue<SystemMainMapAMapSampleScatterController>(),
      marker: new PromiseValue<SystemMainMapAMapSampleMarkerLayerController>(),
    },

    road: new PromiseValue<IASMapAMapRoadController>(),
    info: new PromiseValue<IASMapAMapInfoController>(),
    heatmap: new PromiseValue<SystemMainMapAMapHeatmapController>(),
  };

  private init = {
    map: (map: AMap.Map) => {
      this.regist.map(map);
      this.map.set(map);
      console.log('overlays:', map.getAllOverlays());
      console.log('layers:', map.getLayers());
    },
    shop: {
      point: (loca: Loca.Container) => {
        let ctr = new IASMapAMapPointLayerController(loca);
        ctr.event.move.subscribe((data) => {
          this.regist.point.over(data as IShop);
        });
        this.controller.shop.point.set(ctr);
      },
      marker: (map: AMap.Map, info: IASMapAMapInfoController) => {
        let ctr = new SystemMainMapAMapShopMarkerLayerController(map, info);
        ctr.event.click.subscribe((x) => {
          this.event.shop.click.emit(x);
        });
        ctr.event.dblclick.subscribe((x) => {
          this.event.shop.dblclick.emit(x);
        });
        this.controller.shop.marker.set(ctr);
      },
    },
    device: {
      marker: (map: AMap.Map, info: IASMapAMapInfoController) => {
        let ctr = new SystemMainMapAMapDeviceMarkerLayerController(map, info);

        this.controller.device.marker.set(ctr);
      },
    },
    alarm: {
      scatter: (loca: Loca.Container) => {
        let ctr = new SystemMainMapAMapAlarmScatterController(loca);
        this.controller.alarm.scatter.set(ctr);
      },
      info: (map: AMap.Map) => {
        let ctr = new SystemMainMapAMapAlarmInfoController(map, this.tool);
        ctr.event.video.subscribe((data) => {
          this.event.alarm.video.emit(data);
        });
        ctr.event.picture.subscribe((data) => {
          this.event.alarm.picture.emit(data);
        });
        ctr.event.close.subscribe((data) => {
          this.regist.alarm.blur();
        });
        this.controller.alarm.info.set(ctr);
      },
      marker: (map: AMap.Map, info: IASMapAMapInfoController) => {
        let ctr = new SystemMainMapAMapAlarmMarkerLayerController(map, info);
        ctr.event.click.subscribe((x) => {
          this.regist.alarm.over(x as MobileEventRecord);
        });
        this.controller.alarm.marker.set(ctr);
      },
    },
    sample: {
      scatter: (loca: Loca.Container) => {
        let ctr = new SystemMainMapAMapSampleScatterController(loca);
        this.controller.sample.scatter.set(ctr);
      },
      marker: (map: AMap.Map, info: IASMapAMapInfoController) => {
        let ctr = new SystemMainMapAMapSampleMarkerLayerController(map, info);
        ctr.event.dblclick.subscribe((x) => {
          this.event.sample.dblclick.emit(x);
        });
        this.controller.sample.marker.set(ctr);
      },
    },

    road: (map: AMap.Map, loca: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, loca);
      this.controller.road.set(ctr);
    },
    info: (map: AMap.Map) => {
      let ctr = new IASMapAMapInfoController(map);
      this.controller.info.set(ctr);
      return ctr;
    },
    heatmap: (loca: Loca.Container) => {
      let ctr = new SystemMainMapAMapHeatmapController(loca);
      this.controller.heatmap.set(ctr);
    },
  };
  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        let position: [number, number] = [e.pixel.x, e.pixel.y];
        this.controller.shop.point.get().then((x) => {
          x.moving(position);
        });
      });
    },
    alarm: {
      over: async (data?: MobileEventRecord) => {
        let info = await this.controller.alarm.info.get();
        if (data) {
          info.add(data);
        }
      },
      blur: () => {
        this.controller.alarm.marker.get().then((x) => {
          x.blur();
        });
      },
    },
    point: {
      over: async (data?: IShop) => {
        this.controller.info.get().then((ctr) => {
          if (data && data.Location) {
            let info: IIASMapAMapInfo = {
              Name: data.Name,
            };
            if (data.Location) {
              info.Location = [
                data.Location.GCJ02.Longitude,
                data.Location.GCJ02.Latitude,
              ];
            }
            ctr.add(info, undefined, [0, -15]);
          } else {
            ctr.remove();
          }
        });
      },
    },
  };

  focus(datas?: any) {
    this.map.get().then((x) => {
      x.setFitView(datas, true);
      let center = x.getCenter();

      x.setZoom(17);
      x.setPitch(45);
      x.setCenter(center);
    });
  }
  async destory() {
    let loca = await this.loca.get();
    loca.clear();
    loca.animate.stop();
    loca.destroy();

    let map = await this.map.get();
    map.destroy();
  }
}
