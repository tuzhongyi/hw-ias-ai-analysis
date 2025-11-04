import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationTaskDetectedResultParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

@Injectable()
export class SystemTaskRouteMapShopRegistrationBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(taskId: string, detected?: boolean) {
    let params = new GetShopRegistrationTaskDetectedResultParams();
    params.TaskIds = [taskId];
    params.RouteFilterEnabled = true;
    params.Detected = detected;
    return this.service.shop.task.detected.result.all(params);
  }

  get(id: string) {
    return this.service.shop.cache.get(id);
  }
  async contains(shops: Shop[]) {
    let result = [];
    for (let i = 0; i < shops.length; i++) {
      const shop = shops[i];
      if (!shop.RegistrationId) {
        result.push(shop);
        continue;
      }
      try {
        await this.get(shop.RegistrationId);
      } catch (error) {
        result.push(shop);
      }
    }
    return result;
  }
}
