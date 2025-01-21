import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemMapStateSourceController {
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  constructor(private manager: Manager) {
    this.states = new Promise<EnumNameValue<ShopObjectState>[]>((resolve) => {
      this.manager.capability.analysis.shop.then((x) => {
        if (x.ShopObjectStates) {
          resolve(x.ShopObjectStates);
        }
      });
    });
  }
}
