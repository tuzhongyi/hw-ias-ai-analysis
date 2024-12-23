import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { MediumRequestService } from '../../../../common/data-core/requests/services/medium/medium.service';

import { Language } from '../../../../common/tools/language';
import { ShopModel } from './system-module-shop-table.model';

@Injectable()
export class SystemModuleShopTableConverter {
  constructor(private medium: MediumRequestService) {}

  convert(source: Shop) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(ShopModel, plain);
    model.Telphone = source.Telphone ?? '';
    model.Address = source.Address ?? '';
    model.Name = source.Name ?? '';
    if (source.ImageUrl) {
      model.Image = this.medium.picture(source.ImageUrl);
    }
    if (source.Confidence) {
      model.ConfidenceRatio = `${(source.Confidence * 100).toFixed(2)}%`;
    }

    model.State = Language.ShopObjectState(source.ObjectState);
    model.hasdata = true;
    return model;
  }
}
