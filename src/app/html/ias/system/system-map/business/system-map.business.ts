import { Injectable } from '@angular/core';
import { SystemMapRoadBusiness } from './system-map-road.business';
import { SystemMapShopBusiness } from './system-map-shop.business';

@Injectable()
export class SystemMapBusiness {
  constructor(
    public shop: SystemMapShopBusiness,
    public road: SystemMapRoadBusiness
  ) {}
}
