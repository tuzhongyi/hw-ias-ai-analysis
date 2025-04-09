import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { ShopConverter } from '../../../../../../../common/view-models/shop/shop.converter';
import { SystemModuleShopTableItem } from '../system-module-shop-table.model';

@Injectable()
export class SystemModuleShopTableConverter {
  constructor(
    private converter: ShopConverter,
    private medium: MediumRequestService
  ) {}

  convert(source: Shop) {
    let model = new SystemModuleShopTableItem();
    let vm = this.converter.convert(source);
    model = Object.assign(model, vm);
    model.Telphone = source.Telphone ?? '';
    model.Address = source.Address ?? '';
    model.Name = source.Name ?? '';
    model.hasdata = true;
    if (source.ImageUrl) {
      model.Image = this.medium.picture(source.ImageUrl);
    }
    return model;
  }
}
