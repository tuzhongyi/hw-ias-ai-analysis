import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

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
