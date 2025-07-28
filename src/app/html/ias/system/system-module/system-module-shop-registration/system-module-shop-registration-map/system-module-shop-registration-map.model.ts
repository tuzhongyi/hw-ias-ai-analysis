import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemMapSearchShopRoadArgs } from '../../../system-map/system-map-search-shop-road/system-map-search-shop-road.model';

export class SystemModuleShopRegistrationMapArgs
  implements SystemMapSearchShopRoadArgs
{
  reload?: boolean;
  name?: string;
  road: {
    on?: Road;
    ori?: Road;
  } = {};
  side?: number;
}
