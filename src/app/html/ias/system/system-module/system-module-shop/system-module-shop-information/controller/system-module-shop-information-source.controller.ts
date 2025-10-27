import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { SignType } from '../../../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemModuleShopInformationSourceController {
  types: Promise<EnumNameValue<SignType>[]>;
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  units: Promise<EnumNameValue<string>[]>;
  industries: Promise<EnumNameValue<string>[]>;
  scopes: Promise<EnumNameValue<string>[]>;

  constructor(source: SourceManager) {
    this.types = source.analysis.shop.ShopTypes.get();
    this.states = source.analysis.shop.ShopObjectStates.get();
    this.units = source.analysis.shop.UnitTypes.get();
    this.industries = source.analysis.shop.Industries.get();
    this.scopes = source.analysis.shop.BusinessScopes.get();
  }
}
