import { Injectable } from '@angular/core';
import { IASMapCityBusiness } from '../../../../share/map/business/ias-map-city.business';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { SystemMainMapRoadBusiness } from './system-main-map-road.business';
import { SystemMainMapShopBusiness } from './system-main-map-shop.business';

@Injectable()
export class SystemMainMapBusiness {
  shop: SystemMainMapShopBusiness;
  road: SystemMainMapRoadBusiness;

  constructor(
    geo: ArmGeographicRequestService,
    private city: IASMapCityBusiness,
  ) {
    this.shop = new SystemMainMapShopBusiness(geo);
    this.road = new SystemMainMapRoadBusiness(geo);
  }

  fallback() {
    return this.city.fallback();
  }
}
