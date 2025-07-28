import { Road } from '../../../../../common/data-core/models/arm/geographic/road.model';

export interface SystemMapSearchShopRoadArgs {
  name?: string;
  road: SystemMapSearchRoadArgs;
  side?: number;
}

interface SystemMapSearchRoadArgs {
  on?: Road;
  ori?: Road;
}

export enum RoadType {
  On = 1,
  Ori = 2,
}
