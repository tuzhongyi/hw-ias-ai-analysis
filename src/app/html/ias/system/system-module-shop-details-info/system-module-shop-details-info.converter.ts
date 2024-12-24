import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MediumRequestService } from '../../../../common/data-core/requests/services/medium/medium.service';
import { ShopSignModel } from './system-module-shop-details-info.model';

@Injectable()
export class SystemModuleShopDetailsInfoConverter {
  constructor(private medium: MediumRequestService) {}

  convert(source: ShopSign) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(ShopSignModel, plain);
    if (source.ImageUrl) {
      model.Image = this.medium.picture(source.ImageUrl);
    }
    return model;
  }
}
