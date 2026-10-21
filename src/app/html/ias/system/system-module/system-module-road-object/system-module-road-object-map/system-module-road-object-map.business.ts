import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectMapBusiness {
  constructor(
    geo: ArmGeographicRequestService,
    division: ArmDivisionRequestService,
  ) {
    this.service = { geo, division };
  }

  private service: {
    geo: ArmGeographicRequestService;
    division: ArmDivisionRequestService;
  };
  division() {
    return this.service.division.root();
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
