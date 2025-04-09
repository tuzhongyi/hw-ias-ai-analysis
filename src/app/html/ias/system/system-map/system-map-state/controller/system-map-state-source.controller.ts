import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemMapStateSourceController {
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  constructor(source: SourceManager) {
    this.states = source.shop.ShopObjectStates;
  }
}
