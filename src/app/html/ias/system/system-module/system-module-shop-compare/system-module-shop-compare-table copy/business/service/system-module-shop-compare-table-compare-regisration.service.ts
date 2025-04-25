import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ShopTaskCompareParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

@Injectable()
export class SystemModuleShopCompareTableCompareRegistrationService {
  constructor(private service: ArmGeographicRequestService) {}

  compare(taskIds: string[]) {
    let params = new ShopTaskCompareParams();
    params.TaskIds = taskIds;
    return this.service.shop.task.compare(params);
  }
}
