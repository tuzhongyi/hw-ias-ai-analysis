import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';

export class SystemModuleRoadPointTableArgs {
  name?: string;
  type?: number;
}
export class SystemModuleRoadPointTableItem extends RoadPoint {
  PointTypeName?: Promise<string>;
  EventTypeNames?: string;
  RoadObjectTypeNames?: string;
}
