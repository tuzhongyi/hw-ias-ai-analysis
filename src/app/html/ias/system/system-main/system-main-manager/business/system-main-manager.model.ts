import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';

export class SystemMainManagerShopArgs {
  name?: string;
  road: RoadArgs = {};
}

interface RoadArgs {
  on?: Road;
  ori?: Road;
}
