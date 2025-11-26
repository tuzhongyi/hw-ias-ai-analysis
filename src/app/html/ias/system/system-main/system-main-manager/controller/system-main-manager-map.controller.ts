import { EventEmitter } from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ILocation } from '../../../../../../common/data-core/models/model.interface';
import { Paged } from '../../../../../../common/data-core/models/page-list.model';
import { SystemMainManagerComponent } from '../system-main-manager.component';

export class SystemMainManagerMapController {
  over = new EventEmitter<ShopRegistration>();
  out = new EventEmitter<ShopRegistration>();
  select = new EventEmitter<ShopRegistration>();
  moveto = new EventEmitter<ILocation>();
  heatmap = {
    load: new EventEmitter<ILocation[]>(),
  };
  data: {
    shop: ShopRegistration[];
    device: MobileDevice[];
    realtime: MobileEventRecord[];
    sample: GpsTaskSampleRecord[];
  };

  display = {
    shop: true,
    device: true,
    alarm: true,
    sample: true,
    heatmap: false,
  };

  constructor(private that: SystemMainManagerComponent) {
    this.data = this.init.data();
  }

  private init = {
    data: () => {
      return {
        shop: [],
        device: [],
        realtime: [],
        sample: [],
      };
    },
  };

  on = {
    select: (data: ShopRegistration) => {
      this.that.shop.selected = data;
    },
    details: (data: ShopRegistration) => {
      this.that.shop.selected = data;
      this.that.panel.details.show = true;
    },
    heatmap: (datas: ILocation[]) => {
      this.heatmap.load.emit(datas);
    },
    picture: <T>(paged: Paged<T>) => {
      this.that.window.picture.open(paged);
    },
  };
}
