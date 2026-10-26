import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { IASMapCityBusiness } from '../../../../share/map/business/ias-map-city.business';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectMapBusiness {
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

  address(position: [number, number]) {
    let point = new GisPoint();
    point.Longitude = position[0];
    point.Latitude = position[1];
    point.Altitude = 0;
    return this.service.geo.road.address(point).then((x) => {
      return x.FormattedAddress;
    });
  }
}
