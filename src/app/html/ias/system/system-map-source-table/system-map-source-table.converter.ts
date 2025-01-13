import { Injectable } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Language } from '../../../../common/tools/language';
import { LanguageTool } from '../../../../common/tools/language.tool';
import { ShopModel } from './system-map-source-table.model';

@Injectable()
export class SystemMapSourceTableConverter {
  constructor(private language: LanguageTool) {}
  convert(data: Shop) {
    let model = new ShopModel();
    model = Object.assign(model, data);
    model.StateName = Language.ShopObjectState(data.ObjectState);
    return model;
  }
}
