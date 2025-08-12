import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { SystemMainMapRoadBusiness } from './system-main-map-road.business';
import { SystemMainMapShopBusiness } from './system-main-map-shop.business';

@Injectable()
export class SystemMainMapBusiness {
  shop: SystemMainMapShopBusiness;
  road: SystemMainMapRoadBusiness;

  constructor(geo: ArmGeographicRequestService) {
    this.shop = new SystemMainMapShopBusiness(geo);
    this.road = new SystemMainMapRoadBusiness(geo);
  }
}
