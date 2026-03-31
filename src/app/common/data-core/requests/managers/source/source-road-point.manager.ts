import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceRoadPointManager {
  RoadPointTypes = new PromiseValue<EnumNameValue<number>[]>();
  ScheduleEnabled = new PromiseValue<boolean>();

  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.road.point.get().then((x) => {
      if (x.RoadPointTypes) {
        this.RoadPointTypes.set(x.RoadPointTypes);
      }
      if (x.ScheduleEnabled != undefined) {
        this.ScheduleEnabled.set(x.ScheduleEnabled);
      }
    });
  }
}
