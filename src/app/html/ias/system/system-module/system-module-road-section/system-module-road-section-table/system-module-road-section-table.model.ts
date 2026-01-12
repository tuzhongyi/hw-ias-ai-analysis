import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';

export class SystemModuleRoadSectionTableArgs {
  name?: string;
  type?: number;
}
export class SystemModuleRoadSectionTableItem extends RoadSection {
  EventTypeNames?: string;
}
