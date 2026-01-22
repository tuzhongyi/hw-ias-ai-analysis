import { EventEmitter } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ILocation } from '../../../../../../common/data-core/models/model.interface';
import { Paged } from '../../../../../../common/data-core/models/page-list.model';
import { SystemMainManagerComponent } from '../system-main-manager.component';

export class SystemMainManagerMapController {
  over = new EventEmitter<ShopRegistration>();
  out = new EventEmitter<ShopRegistration>();
  select = new EventEmitter<
    ShopRegistration | MobileEventRecord | GpsTaskSampleRecord
  >();
  moveto = new EventEmitter<ILocation>();
  heatmap = {
    textable: true,
    load: new EventEmitter<ILocation[]>(),
  };
  data: {
    shop: ShopRegistration[];
    device: MobileDevice[];
    realtime: MobileEventRecord[];
    timeout: MobileEventRecord[];
    sample: GpsTaskSampleRecord[];
    road: {
      object: RoadObject[];
    };
  };
  private source = {
    shop: [] as ShopRegistration[],
  };

  display = {
    shop: false,
    device: true,
    realtime: true,
    timeout: true,
    sample: true,
    heatmap: false,
    road: {
      object: false,
    },
  };

  constructor(private that: SystemMainManagerComponent) {
    this.data = this.init.data();
  }

  private init = {
    data: () => {
      return {
        shop: [],
        device: [],
        sample: [],
        realtime: [],
        timeout: [],
        road: {
          object: [],
        },
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
    device: (data: MobileDevice) => {
      this.that.window.device.route.deviceId = data.Id;
      this.that.window.device.route.show = true;
    },
  };
}
