import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceSecurityManager {
  constructor(private capability: CapabilityManager) {}

  private _PriorityTypes?: EnumNameValue<string>[];
  get PriorityTypes() {
    return new Promise<EnumNameValue<string>[]>((resolve) => {
      if (this._PriorityTypes) {
        resolve(this._PriorityTypes);
      } else {
        this.capability.security.then((x) => {
          if (x.PriorityTypes) {
            this._PriorityTypes = x.PriorityTypes;
            resolve(this._PriorityTypes);
          }
        });
      }
    });
  }
}
