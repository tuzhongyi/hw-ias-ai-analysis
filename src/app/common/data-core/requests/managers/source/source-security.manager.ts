import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceSecurityManager {
  PriorityTypes = new PromiseValue<EnumNameValue<string>[]>();
  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.security.get().then((x) => {
      if (x.PriorityTypes) {
        this.PriorityTypes.set(x.PriorityTypes);
      }
    });
  }
}
