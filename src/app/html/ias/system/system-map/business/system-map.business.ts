import { Injectable } from '@angular/core';
import { SystemMapRoadBusiness } from './road/system-map-road.business';
import { SystemMapShopBusiness } from './shop/system-map-shop.business';

@Injectable()
export class SystemMapBusiness {
  constructor(
    public shop: SystemMapShopBusiness,
    public road: SystemMapRoadBusiness
  ) {}
}
