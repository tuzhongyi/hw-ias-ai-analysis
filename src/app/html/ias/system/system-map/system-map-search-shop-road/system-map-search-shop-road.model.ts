import { Road } from '../../../../../common/data-core/models/arm/geographic/road.model';

export interface SystemMapSearchShopRoadArgs {
  name?: string;
  road?: SystemMapSearchRoadArgs;
}

interface SystemMapSearchRoadArgs {
  on?: Road;
  ori?: Road;
}
