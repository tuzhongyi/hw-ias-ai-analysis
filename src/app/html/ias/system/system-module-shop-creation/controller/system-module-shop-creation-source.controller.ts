import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../common/data-core/requests/managers/source.manager';

@Injectable()
export class SystemModuleShopCreationSourceController {
  types: Promise<EnumNameValue<SignType>[]>;
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  units: Promise<EnumNameValue<string>[]>;
  industries: Promise<EnumNameValue<string>[]>;
  scopes: Promise<EnumNameValue<string>[]>;

  constructor(source: SourceManager) {
    this.types = source.shop.ShopTypes;
    this.states = source.shop.ShopObjectStates;
    this.units = source.shop.UnitTypes;
    this.industries = source.shop.Industries;
    this.scopes = source.shop.BusinessScopes;
  }
}
