import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceRoadObjectManager {
  ObjectTypes = new PromiseValue<EnumNameValue<number>[]>();
  EventTypes = new PromiseValue<EnumNameValue<number>[]>();
  ImageSamplingPlans = new PromiseValue<EnumNameValue<number>[]>();
  ObjectStates = new PromiseValue<EnumNameValue<number>[]>();

  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.road.object.get().then((x) => {
      if (x.ObjectTypes) {
        this.ObjectTypes.set(x.ObjectTypes);
      }
      if (x.EventTypes) {
        this.EventTypes.set(x.EventTypes);
      }
      if (x.ImageSamplingPlans) {
        this.ImageSamplingPlans.set(x.ImageSamplingPlans);
      }
      if (x.ObjectStates) {
        this.ObjectStates.set(x.ObjectStates);
      }
    });
  }
}
