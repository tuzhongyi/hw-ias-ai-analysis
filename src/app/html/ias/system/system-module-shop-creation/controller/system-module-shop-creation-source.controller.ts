import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleShopCreationSourceController {
  types: Promise<EnumNameValue<SignType>[]>;
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  units: Promise<EnumNameValue<string>[]>;
  industries: Promise<EnumNameValue<string>[]>;
  scopes: Promise<EnumNameValue<string>[]>;

  constructor(private manager: Manager) {
    this.types = this.init.types();
    this.states = this.init.states();
    this.units = this.init.units();
    this.industries = this.init.industries();
    this.scopes = this.init.scopes();
  }

  private init = {
    types: async () => {
      return new Promise<EnumNameValue<SignType>[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.SignTypes) {
            resolve(x.SignTypes);
          }
        });
      });
    },
    states: () => {
      return new Promise<EnumNameValue<ShopObjectState>[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.ShopObjectStates) {
            resolve(x.ShopObjectStates);
          }
        });
      });
    },
    units: () => {
      return new Promise<EnumNameValue<string>[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.UnitTypes) {
            resolve(x.UnitTypes);
          }
        });
      });
    },
    industries: () => {
      return new Promise<EnumNameValue<string>[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.Industries) {
            resolve(x.Industries);
          }
        });
      });
    },
    scopes: () => {
      return new Promise<EnumNameValue<string>[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.BusinessScopes) {
            resolve(x.BusinessScopes);
          }
        });
      });
    },
  };
}
