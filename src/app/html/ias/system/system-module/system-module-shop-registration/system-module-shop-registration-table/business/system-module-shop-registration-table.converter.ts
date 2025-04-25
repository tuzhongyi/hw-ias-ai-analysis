import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { LanguageTool } from '../../../../../../../common/tools/language.tool';
import { SystemModuleShopRegistrationTableItem } from '../system-module-shop-registration-table.model';

@Injectable()
export class SystemModuleShopRegistrationTableConverter {
  constructor(
    private language: LanguageTool,
    private medium: MediumRequestService
  ) {}
  async convert(source: ShopRegistration) {
    let item = new SystemModuleShopRegistrationTableItem();
    item = Object.assign(item, source);
    item.ObjectStateName = await this.language.ShopObjectState(
      item.ObjectState
    );
    item.ShopTypeName = await this.language.ShopType(item.ShopType);
    if (item.ImageUrl) {
      item.Image = this.medium.picture(item.ImageUrl);
    }
    return item;
  }
}
