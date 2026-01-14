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
  ObjectTypeName = '';
  ObjectStateNames = '';
}
