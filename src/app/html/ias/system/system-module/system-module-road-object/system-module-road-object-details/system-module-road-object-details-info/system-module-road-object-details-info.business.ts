import { Injectable } from '@angular/core';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectDetailsInfoBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  address(position: [number, number]) {
    let point = new GisPoint();
    point.Longitude = position[0];
    point.Latitude = position[1];
    point.Altitude = 0;
    point.GisType = GisType.WGS84;
    return this.service.road.address(point).then((x) => {
      return x.FormattedAddress;
    });
  }
}
