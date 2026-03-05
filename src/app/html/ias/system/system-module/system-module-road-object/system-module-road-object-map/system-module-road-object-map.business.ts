import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectMapBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  road() {
    return this.service.road.cache.all();
  }

  address(position: [number, number]) {
    let point = new GisPoint();
    point.Longitude = position[0];
    point.Latitude = position[1];
    point.Altitude = 0;
    return this.service.road.address(point).then((x) => {
      return x.FormattedAddress;
    });
  }
}
