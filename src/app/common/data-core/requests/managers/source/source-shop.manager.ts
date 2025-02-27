import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceShopManager {
  constructor(private capability: CapabilityManager) {}

  private _ShopTypes?: EnumNameValue<number>[];
  get ShopTypes() {
    return new Promise<EnumNameValue<number>[]>((resolve) => {
      if (this._ShopTypes) {
        resolve(this._ShopTypes);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.SignTypes) {
            this._ShopTypes = x.SignTypes;
            resolve(this._ShopTypes);
          }
        });
      }
    });
  }
  private _SignTypes?: EnumNameValue<number>[];
  get SignTypes() {
    return new Promise<EnumNameValue<number>[]>((resolve) => {
      if (this._SignTypes) {
        resolve(this._SignTypes);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.SignTypes) {
            this._SignTypes = x.SignTypes;
            resolve(this._SignTypes);
          }
        });
      }
    });
  }
  private _ResultLabelTypes?: EnumNameValue<number>[];
  get ResultLabelTypes() {
    return new Promise<EnumNameValue<number>[]>((resolve) => {
      if (this._ResultLabelTypes) {
        resolve(this._ResultLabelTypes);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.ResultLabelTypes) {
            this._ResultLabelTypes = x.ResultLabelTypes;
            resolve(this._ResultLabelTypes);
          }
        });
      }
    });
  }
  private _BusinessScopes?: EnumNameValue[];
  get BusinessScopes() {
    return new Promise<EnumNameValue[]>((resolve) => {
      if (this._BusinessScopes) {
        resolve(this._BusinessScopes);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.BusinessScopes) {
            this._BusinessScopes = x.BusinessScopes;
            resolve(this._BusinessScopes);
          }
        });
      }
    });
  }
  private _Industries?: EnumNameValue[];
  get Industries() {
    return new Promise<EnumNameValue[]>((resolve) => {
      if (this._Industries) {
        resolve(this._Industries);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.Industries) {
            this._Industries = x.Industries;
            resolve(this._Industries);
          }
        });
      }
    });
  }
  private _ShopObjectStates?: EnumNameValue<number>[];
  get ShopObjectStates() {
    return new Promise<EnumNameValue<number>[]>((resolve) => {
      if (this._ShopObjectStates) {
        resolve(this._ShopObjectStates);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.ShopObjectStates) {
            this._ShopObjectStates = x.ShopObjectStates;
            resolve(this._ShopObjectStates);
          }
        });
      }
    });
  }
  private _CameraNos?: EnumNameValue[];
  get CameraNos() {
    return new Promise<EnumNameValue[]>((resolve) => {
      if (this._CameraNos) {
        resolve(this._CameraNos);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.CameraNos) {
            this._CameraNos = x.CameraNos;
            resolve(this._CameraNos);
          }
        });
      }
    });
  }
  private _UnitTypes?: EnumNameValue[];
  get UnitTypes() {
    return new Promise<EnumNameValue[]>((resolve) => {
      if (this._UnitTypes) {
        resolve(this._UnitTypes);
      } else {
        this.capability.analysis.shop.then((x) => {
          if (x.UnitTypes) {
            this._UnitTypes = x.UnitTypes;
            resolve(this._UnitTypes);
          }
        });
      }
    });
  }
}
