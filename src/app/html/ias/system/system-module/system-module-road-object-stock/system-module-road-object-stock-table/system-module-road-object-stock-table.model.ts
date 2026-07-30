import { Division } from '../../../../../../common/data-core/models/arm/division/division.model';
import { RoadObjectStock } from '../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';

export class SystemModuleRoadObjectStockTableArgs {
  name?: string;
  type?: number;
  first = false;
}
export class RoadObjectStockModel extends RoadObjectStock {
  Image?: string;
  ObjectTypeName!: Promise<string>;
  Division?: Promise<Division>;
  GridCell?: Promise<Division>;
  AddressSubed?: Promise<string>;
}
