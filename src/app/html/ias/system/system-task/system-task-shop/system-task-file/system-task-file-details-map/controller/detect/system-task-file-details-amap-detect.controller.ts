import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { SystemTaskFileDetailsAMapDetectedController } from './system-task-file-details-amap-detect-ed.controller';
import { SystemTaskFileDetailsAMapUndetectedController } from './system-task-file-details-amap-detect-no.controller';

export class SystemTaskFileDetailsAMapDetectController {
  event = {
    move: new EventEmitter<IShop>(),
  };
  constructor(container: Loca.Container) {
    this.detected = new SystemTaskFileDetailsAMapDetectedController(container);
    this.undetected = new SystemTaskFileDetailsAMapUndetectedController(
      container
    );
    this.regist();
  }

  detected: SystemTaskFileDetailsAMapDetectedController;
  undetected: SystemTaskFileDetailsAMapUndetectedController;

  private regist() {
    this.detected.event.move.subscribe((x) => {
      this.event.move.emit(x as IShop);
    });
    this.undetected.event.move.subscribe((x) => {
      this.event.move.emit(x as IShop);
    });
  }

  load(datas: ShopRegistrationTaskDetectedResult[]) {
    let detect: {
      ed: ShopRegistrationTaskDetectedResult[];
      un: ShopRegistrationTaskDetectedResult[];
    } = {
      ed: [],
      un: [],
    };
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.Detected) {
        detect.ed.push(item);
      } else {
        detect.un.push(item);
      }
    }
    this.detected.load(detect.ed, { zooms: [0, 50] });
    this.undetected.load(detect.un, { zooms: [0, 50] });
  }

  moving(position: [number, number]) {
    this.detected.moving(position);
    this.undetected.moving(position);
  }
}
