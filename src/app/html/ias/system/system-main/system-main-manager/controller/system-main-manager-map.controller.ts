import { EventEmitter } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
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
  private source = {
    shop: [] as ShopRegistration[],
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

  filter(state?: ShopObjectState) {}

  on = {
    shop: {
      select: (data: ShopRegistration) => {
        this.that.shop.selected = data;
      },
      details: (data: ShopRegistration) => {
        this.that.shop.selected = data;
        this.that.panel.details.show = true;
      },
      filter: (states: ShopObjectState[]) => {
        this.data.shop = this.that.shop.data.registration.filter((x) =>
          states.includes(x.ObjectState)
        );
      },
    },

    heatmap: (datas: ILocation[]) => {
      this.heatmap.load.emit(datas);
    },
    picture: <T>(paged: Paged<T>) => {
      this.that.window.picture.open(paged);
    },
    sample: (data: GpsTaskSampleRecord) => {
      this.that.window.details.sample.data = data;
      this.that.window.details.sample.title =
        data.SceneName || '定制场景事件详情';
      this.that.window.details.sample.show = true;
    },
  };
}
