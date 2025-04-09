import { Injectable } from '@angular/core';
import { ShopTaskCompareResult } from '../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ShopTaskCompareParams } from '../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { LocalStorage } from '../../../../../../common/storage/local.storage';
import { ISystemMapStorage } from '../../../../../../common/storage/system-map-storage/system-map.storage';
import { SystemMapTaskFilter } from './system-map-task.model';

@Injectable()
export class SystemMapTaskRegistrationBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private local: LocalStorage
  ) {}

  private get config(): ISystemMapStorage {
    return this.local.system.map.get();
  }

  async load(task: SystemMapTaskFilter): Promise<ShopTaskCompareResult[]> {
    let datas = await this.data(task);

    datas.forEach((item) => {
      if (item.Shop) {
        item.Shop.ObjectState = item.ObjectState;
      }
    });

    return datas;
  }

  private data(args: SystemMapTaskFilter) {
    let params = new ShopTaskCompareParams();
    params.TaskIds = args.ids;
    params.Ratio = this.config.ratio;
    params.Distance = this.config.distance;
    return this.service.shop.task.compare(params);
  }
}
