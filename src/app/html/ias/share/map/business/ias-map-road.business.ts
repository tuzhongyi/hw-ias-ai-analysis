import { Injectable } from '@angular/core';
import { IASMapCityBusiness } from './ias-map-city.business';
import { ArmGeographicRequestService } from '../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class IASMapRoadBusiness {
  constructor(
    geo: ArmGeographicRequestService,
    city: IASMapCityBusiness,
  ) {
    this.service = { geo, city };
  }

  private service: {
    geo: ArmGeographicRequestService;
    city: IASMapCityBusiness;
  };
  fallback() {
    return this.service.city.fallback();
  }
  async road() {
    let datas = await this.service.geo.road.cache.all();
    if (datas.length == 0) {
      throw new Error();
    }
    return datas;
  }
}
