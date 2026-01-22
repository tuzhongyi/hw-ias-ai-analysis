import { Division } from '../../../../../../common/data-core/models/arm/division/division.model';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';

export class SystemModuleRoadObjectTableArgs {
  name?: string;
  type?: number;
  address?: string;
  division?: string;
  state?: number;
  category?: number;
}
export class SystemModuleRoadObjectTableItem extends RoadObject {
  Image?: string;
  ObjectTypeName!: Promise<string>;
  ObjectStateName!: Promise<string>;
  Division?: Promise<Division>;
  GridCell?: Promise<Division>;
}
