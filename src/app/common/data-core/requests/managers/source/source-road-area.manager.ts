import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceRoadAreaManager {
  RoadAreaUsageTypes = new PromiseValue<EnumNameValue<number>[]>();

  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.road.area.get().then((x) => {
      if (x.RoadAreaUsageTypes) {
        this.RoadAreaUsageTypes.set(x.RoadAreaUsageTypes);
      }
    });
  }
}
