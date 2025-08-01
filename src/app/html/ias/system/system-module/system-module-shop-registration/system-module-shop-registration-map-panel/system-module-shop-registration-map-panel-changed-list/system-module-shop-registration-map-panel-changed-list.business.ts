import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleShopRegistrationMapPanelChangedListBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  private update(data: ShopRegistration) {
    return this.service.shop.update(data);
  }

  save(datas: ShopRegistration[]) {
    return new Promise<ShopRegistration[]>((resolve, reject) => {
      let count = 0;
      let result = {
        seccess: [] as ShopRegistration[],
        error: [] as ShopRegistration[],
      };
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        this.update(data)
          .then((x) => {
            result.seccess.push(x);
          })
          .catch((error) => {
            result.error.push(data);
            console.error(error);
          });
      }

      if (result.error.length > 0) {
        reject(result.error);
      }
      if (result.seccess.length > 0) {
        resolve(result.seccess);
      }
    });
  }
}
