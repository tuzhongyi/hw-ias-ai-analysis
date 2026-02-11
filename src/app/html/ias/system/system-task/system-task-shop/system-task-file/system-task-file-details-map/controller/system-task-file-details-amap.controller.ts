import { EventEmitter, Injectable } from '@angular/core';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapPathArrowController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path-arrow.controller';
import { IASMapAMapPathLabelController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path-label.controller';
import { IASMapAMapPathWayController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path-way.controller';
import { IASMapAMapPathController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path.controller';
import { SystemTaskFileDetailsAMapCopiedController } from './cipied/system-task-file-details-amap-copied.controller';
import { SystemTaskFileDetailsAMapDetectController } from './detect/system-task-file-details-amap-detect.controller';
import { SystemTaskFileDetailsAMapPickupController } from './pickup/system-task-file-details-amap-pickup.controller';
import { SystemTaskFileDetailsAMapTipLayerController } from './tip/system-task-file-details-amap-tip-layer.controller';

@Injectable()
export class SystemTaskFileDetailsAMapController {
  event = {
    point: new EventEmitter<[number, number]>(),
  };
  pickupable = false;

  arrow = new PromiseValue<IASMapAMapPathArrowController>();
  path = new PromiseValue<IASMapAMapPathController>();
  way = new PromiseValue<IASMapAMapPathWayController>();
  label = new PromiseValue<IASMapAMapPathLabelController>();
  pickup = new PromiseValue<SystemTaskFileDetailsAMapPickupController>();
  tip = new PromiseValue<SystemTaskFileDetailsAMapTipLayerController>();
  copied = new PromiseValue<SystemTaskFileDetailsAMapCopiedController>();
  detect = new PromiseValue<SystemTaskFileDetailsAMapDetectController>();

  constructor() {
    MapHelper.amap
      .get('system-task-file-details-map-container', undefined, true)
      .then((x) => {
        this.map.set(x);

        let loca = new Loca.Container({ map: x });
        this.loca.set(loca);

        this.regist.map(x);

        this.arrow.set(new IASMapAMapPathArrowController(x));
        this.path.set(new IASMapAMapPathController(x));
        this.way.set(new IASMapAMapPathWayController(x));
        this.label.set(new IASMapAMapPathLabelController(x));

        let point = new SystemTaskFileDetailsAMapPickupController(x);
        this.pickup.set(point);
        this.regist.point(point);

        let tip = new SystemTaskFileDetailsAMapTipLayerController(x);
        this.tip.set(tip);

        let copied = new SystemTaskFileDetailsAMapCopiedController(loca);
        this.copied.set(copied);

        let detect = new SystemTaskFileDetailsAMapDetectController(loca);
        this.regist.detect(detect);
        this.detect.set(detect);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();

  private regist = {
    map: (map: AMap.Map) => {
      map.on('click', (x) => {
        this.pickup.get().then((point) => {
          let position: [number, number] = [x.lnglat.lng, x.lnglat.lat];
          point.remove().then((x) => {
            if (this.pickupable) {
              point.create(position);
              this.event.point.emit(position);
            }
          });
        });
      });
      map.on('mousemove', (e) => {
        let position: [number, number] = [e.pixel.x, e.pixel.y];
        this.detect.get().then((x) => {
          x.moving(position);
        });
      });
    },
    point: (controller: SystemTaskFileDetailsAMapPickupController) => {
      controller.event.dragend.subscribe((x) => {
        this.event.point.emit(x);
      });
    },
    detect: (controller: SystemTaskFileDetailsAMapDetectController) => {
      controller.event.move.subscribe((data) => {
        this.label.get().then((x) => {
          if (data && data.Location) {
            let position: [number, number] = [
              data.Location.GCJ02.Longitude,
              data.Location.GCJ02.Latitude,
            ];
            x.show(position, data.Name);
          } else {
            x.hide();
          }
        });
      });
    },
  };

  center(position: [number, number]) {
    this.map.get().then((x) => {
      x.setCenter(position);
    });
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
