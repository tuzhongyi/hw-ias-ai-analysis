import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { EnumTool } from '../../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../../common/tools/language';

@Injectable()
export class SystemModuleShopCreationSourceController {
  types: EnumNameValue<SignType>[];
  states: EnumNameValue<ShopObjectState>[];

  constructor() {
    this.types = this.init.types();
    this.states = this.init.states();
  }

  private init = {
    types: () => {
      return EnumTool.values(SignType).map((x) => {
        let item = new EnumNameValue<SignType>();
        item.Name = Language.SignType(x);
        item.Value = x;
        return item;
      });
    },
    states: () => {
      return EnumTool.values(ShopObjectState).map((x) => {
        let item = new EnumNameValue<ShopObjectState>();
        item.Name = Language.ShopObjectState(x);
        item.Value = x;
        return item;
      });
    },
  };
}
