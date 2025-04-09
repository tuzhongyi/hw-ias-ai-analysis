import { Injectable } from '@angular/core';
import { IShop } from '../../data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../data-core/models/arm/analysis/shop.model';
import { LanguageTool } from '../../tools/language.tool';
import { ShopViewModel } from './shop.view-model';

@Injectable({
  providedIn: 'root',
})
export class ShopConverter {
  constructor(private language: LanguageTool) {}
  convert<T extends IShop>(data: T) {
    let model = new ShopViewModel();
    model = Object.assign(model, data);
    model.ObjectStateName = this.language.ShopObjectState(data.ObjectState);
    model.ShopTypeName = this.language.ShopType(data.ShopType);
    if (data instanceof Shop) {
      if (data.Confidence) {
        model.ConfidenceRatio = `${(data.Confidence * 100).toFixed(2)}%`;
      }
    }
    return model;
  }
}
