import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventMapContainerAMapPointHandledController } from './system-event-map-container-amap-point-handled.controller';
import { SystemEventMapContainerAMapPointMisinformController } from './system-event-map-container-amap-point-misinform.controller';
import { SystemEventMapContainerAMapPointUnhandleController } from './system-event-map-container-amap-point-unhandle.controller';

export class SystemEventMapContainerAMapPointController {
  event = {
    move: new EventEmitter<MobileEventRecord>(),
  };

  constructor(private container: Loca.Container) {
    this.handled = new SystemEventMapContainerAMapPointHandledController(
      container
    );
    this.unhandle = new SystemEventMapContainerAMapPointUnhandleController(
      container
    );
    this.misinform = new SystemEventMapContainerAMapPointMisinformController(
      container
    );

    this.regist();
  }

  private handled: SystemEventMapContainerAMapPointHandledController;
  private unhandle: SystemEventMapContainerAMapPointUnhandleController;
  private misinform: SystemEventMapContainerAMapPointMisinformController;

  private regist() {
    this.handled.event.move.subscribe((x) => {
      this.event.move.emit(x as MobileEventRecord);
    });
    this.unhandle.event.move.subscribe((x) => {
      this.event.move.emit(x as MobileEventRecord);
    });
    this.misinform.event.move.subscribe((x) => {
      this.event.move.emit(x as MobileEventRecord);
    });
  }

  load(datas: MobileEventRecord[]) {
    let point = {
      unhandle: datas.filter((x) => !x.Assignment?.Handled),
      misinform: datas.filter((x) => x.Assignment?.IsMisInfo),
      handled: datas.filter(
        (x) => x.Assignment?.Handled && !x.Assignment?.IsMisInfo
      ),
    };

    if (point.handled.length > 0) {
      this.handled.load(point.handled);
    }
    if (point.unhandle.length > 0) {
      this.unhandle.load(point.unhandle);
    }
    if (point.misinform.length > 0) {
      this.misinform.load(point.misinform);
    }
  }

  clear() {
    this.container.clear();
  }

  moving(position: [number, number]) {
    this.handled.moving(position);
    this.unhandle.moving(position);
    this.misinform.moving(position);
  }
}
