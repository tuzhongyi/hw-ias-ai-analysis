import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';

export class SystemEventProcessShopTableArgs {
  name?: string;
  road?: string;
  associated?: boolean;
  location!: GisPoint;
  distance: number = 1000;
}
export class SystemEventProcessShopTableFilter extends SystemEventProcessShopTableArgs {
  asc?: string;
  desc?: string;
}
