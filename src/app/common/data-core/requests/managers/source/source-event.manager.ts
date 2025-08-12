import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceEventManager {
  ResourceTypes = new PromiseValue<EnumNameValue<number>[]>();
  EventTypes = new PromiseValue<EnumNameValue<number>[]>();
  TriggerTypes = new PromiseValue<EnumNameValue<number>[]>();
  EmergencyTypes = new PromiseValue<EnumNameValue<number>[]>();

  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.event.get().then((x) => {
      if (x.ResourceTypes) {
        this.ResourceTypes.set(x.ResourceTypes);
      }
      if (x.EventTypes) {
        this.EventTypes.set(x.EventTypes);
      }
      if (x.TriggerTypes) {
        this.TriggerTypes.set(x.TriggerTypes);
      }
      if (x.EmergencyTypes) {
        this.EmergencyTypes.set(x.EmergencyTypes);
      }
    });
  }
}
