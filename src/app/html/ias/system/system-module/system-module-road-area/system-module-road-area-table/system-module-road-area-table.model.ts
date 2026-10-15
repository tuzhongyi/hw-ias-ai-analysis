import { RoadArea } from '../../../../../../common/data-core/models/arm/geographic/road-area.model';

export class SystemModuleRoadAreaTableArgs {
  name?: string;
  type?: number;
}
export class SystemModuleRoadAreaTableItem extends RoadArea {
  EventTypeNames?: string;
}
