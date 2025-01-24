import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from './capability.manager';

@Injectable({
  providedIn: 'root',
})
export class SourceManager {
  server: SourceServerManager;
  shop: SourceShopManager;
  constructor(capability: CapabilityManager) {
    this.shop = new SourceShopManager(capability);
    this.server = new SourceServerManager(capability);
  }
}
export class SourceServerManager {
  constructor(private capability: CapabilityManager) {}
  private _TaskTypes?: EnumNameValue<number>[];
  get TaskTypes() {
    return new Promise<EnumNameValue<number>[]>((resolve) => {
      if (this._TaskTypes) {
        resolve(this._TaskTypes);
      } else {
        this.capability.analysis.server.then((x) => {
          if (x.TaskTypes) {
            this._TaskTypes = x.TaskTypes;
            resolve(this._TaskTypes);
          }
        });
      }
    });
  }

  private _TaskStates?: EnumNameValue[];
  get TaskStates() {
    return new Promise<EnumNameValue[]>((resolve) => {
      if (this._TaskStates) {
        resolve(this._TaskStates);
      } else {
        this.capability.analysis.server.then((x) => {
          if (x.TaskStates) {
            this._TaskStates = x.TaskStates;
            resolve(this._TaskStates);
          }
        });
      }
    });
  }

  private _VideoSourceProtocolTypes?: EnumNameValue[];
  get VideoSourceProtocolTypes() {
    return new Promise<EnumNameValue[]>((resolve) => {
      if (this._VideoSourceProtocolTypes) {
        resolve(this._VideoSourceProtocolTypes);
      } else {
        this.capability.analysis.server.then((x) => {
          if (x.VideoSourceProtocolTypes) {
            this._VideoSourceProtocolTypes = x.VideoSourceProtocolTypes;
            resolve(this._VideoSourceProtocolTypes);
          }
        });
      }
    });
  }

  private _VideoSourceModes?: EnumNameValue[];
  get VideoSourceModes() {
    return new Promise<EnumNameValue[]>((resolve) => {
      if (this._VideoSourceModes) {
        resolve(this._VideoSourceModes);
      } else {
        this.capability.analysis.server.then((x) => {
          if (x.VideoSourceModes) {
            this._VideoSourceModes = x.VideoSourceModes;
            resolve(this._VideoSourceModes);
          }
        });
      }
    });
  }

  private _SourceTypes?: EnumNameValue<number>[];
  get SourceTypes() {
    return new Promise<EnumNameValue<number>[]>((resolve) => {
      if (this._SourceTypes) {
        resolve(this._SourceTypes);
      } else {
        this.capability.analysis.server.then((x) => {
          if (x.SourceTypes) {
            this._SourceTypes = x.SourceTypes;
            resolve(this._SourceTypes);
          }
        });
      }
    });
  }
}
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
