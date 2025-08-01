import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';

export class SystemEventProcessShopTableArgs {
  name?: string;
  road?: string;
  detected?: boolean;
  location!: GisPoint;
  distance: number = 200;
}
export class SystemEventProcessShopTableFilter extends SystemEventProcessShopTableArgs {
  asc?: string;
  desc?: string;
}
