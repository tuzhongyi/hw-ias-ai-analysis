import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceRoadSectionManager {
  RoadSectionTypes = new PromiseValue<EnumNameValue<number>[]>();
  ScheduleEnabled = new PromiseValue<boolean>();

  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.road.section.get().then((x) => {
      if (x.RoadSectionTypes) {
        this.RoadSectionTypes.set(x.RoadSectionTypes);
      }
      if (x.ScheduleEnabled != undefined) {
        this.ScheduleEnabled.set(x.ScheduleEnabled);
      }
    });
  }
}
