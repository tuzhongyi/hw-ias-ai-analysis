import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { SystemModuleShopRegistrationTableItem } from '../system-module-shop-registration-table.model';

@Injectable()
export class SystemModuleShopRegistrationTableConverter {
  constructor(private medium: MediumRequestService) {}
  async convert(source: ShopRegistration) {
    let item = new SystemModuleShopRegistrationTableItem();
    item = Object.assign(item, source);

    if (item.ImageUrl) {
      item.Image = this.medium.picture(item.ImageUrl);
    }
    return item;
  }
}
