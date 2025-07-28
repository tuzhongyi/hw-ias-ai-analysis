import { EventEmitter, Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import {
  Page,
  Paged,
} from '../../../../../../../../common/data-core/models/page-list.model';
import { SystemEventManagerShopProcessSignController } from './system-event-manager-shop-process-sign.controller';

@Injectable()
export class SystemEventManagerShopProcessController {
  constructor(public sign: SystemEventManagerShopProcessSignController) {}

  page?: Page;
  auto = false;
  get = new EventEmitter<number>();

  open(paged: Paged<MobileEventRecord>) {
    this.page = paged.Page;
    let data = paged.Data;
    switch (data.EventType) {
      case 8:
        this.sign.discover.close();
        this.sign.disappear.open(data);
        break;
      case 9:
        this.sign.disappear.close();
        this.sign.discover.open(data);
        break;
    }
  }

  next() {
    if (this.page) {
      this.get.emit(this.page.PageIndex + 1);
    }
  }
}
