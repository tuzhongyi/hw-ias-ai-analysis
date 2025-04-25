import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ShopTaskCompareParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { LocalStorage } from '../../../../../../../../common/storage/local.storage';
import { ISystemCompareStorage } from '../../../../../../../../common/storage/system-compare-storage/system-compare.storage';

@Injectable()
export class SystemModuleShopCompareTableCompareService {
  constructor(
    private service: ArmGeographicRequestService,
    private local: LocalStorage
  ) {}

  private get storage(): ISystemCompareStorage {
    return this.local.system.compare.get();
  }

  compare(taskIds: string[]) {
    let params = new ShopTaskCompareParams();
    params.TaskIds = taskIds;
    params.Ratio = this.storage.ratio;
    if (this.storage.distance) {
      params.Distance = this.storage.distance;
    }
    return this.service.shop.task.compare(params);
  }
}
