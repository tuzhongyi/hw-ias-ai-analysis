import { Injectable } from '@angular/core';
import { ShopSign } from '../../data-core/models/arm/analysis/shop-sign.model';
import { LanguageTool } from '../../tools/language-tool/language.tool';
import { ShopSignViewModel } from './shop-sign.view-model';

@Injectable({
  providedIn: 'root',
})
export class ShopSignConverter {
  constructor(private language: LanguageTool) {}
  convert(data: ShopSign) {
    let model = new ShopSignViewModel();
    model = Object.assign(model, data);
    model.ObjectStateName = this.language.analysis.shop.ShopObjectState(
      data.ObjectState
    );
    model.SignTypeName = this.language.analysis.shop.ShopType(data.SignType);
    model.ResultLabelTypeName = this.language.analysis.shop.ResultLabelType(
      data.ResultLabelType
    );
    if (data.Confidence) {
      model.ConfidenceRatio = `${(data.Confidence * 100).toFixed(2)}%`;
    }
    return model;
  }
}
