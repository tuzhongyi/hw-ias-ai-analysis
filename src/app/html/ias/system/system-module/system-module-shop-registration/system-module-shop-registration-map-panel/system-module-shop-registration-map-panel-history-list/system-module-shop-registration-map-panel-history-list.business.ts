import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleShopRegistrationMapPanelHistoryListBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  private update(data: ShopRegistration) {
    return this.service.shop.update(data);
  }
  private async delete(data: ShopRegistration) {
    return this.service.shop.delete(data.Id);
  }

  save(
    datas: ShopRegistration[],
    opts: {
      draggable?: boolean;
      removable?: boolean;
    }
  ) {
    return new Promise<ShopRegistration[]>((resolve, reject) => {
      let result = {
        seccess: [] as ShopRegistration[],
        error: [] as ShopRegistration[],
      };
      let promise:
        | ((data: ShopRegistration) => Promise<ShopRegistration>)
        | undefined = undefined;
      if (opts.draggable) {
        promise = this.update;
      }
      if (opts.removable) {
        promise = this.delete;
      }
      if (!promise) {
        reject(new Error('No operation specified for saving data.'));
        return;
      }
      let all: Promise<ShopRegistration>[] = [];
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        all.push(promise(data));
      }

      Promise.all(all)
        .then((x) => {
          resolve(x);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
