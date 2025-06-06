import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/geographic-road.params';

@Injectable()
export class SystemEventProcessShopFilterBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(location: GisPoint, distance: number) {
    let params = new GetRoadsParams();
    params.GeoPoint = location;
    params.MaxDistance = distance;
    return this.service.road.all(params);
  }
}
