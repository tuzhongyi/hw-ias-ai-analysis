import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleShopRegistrationMapManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  update(data: ShopRegistration) {
    return this.service.shop.update(data);
  }

  save(datas: ShopRegistration[]) {
    return new Promise<void>((resolve, reject) => {
      let count = 0;
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        this.update(data)
          .then(() => {
            count++;
            if (count === datas.length) {
              resolve();
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      }
    });
  }
}
