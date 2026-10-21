import { Injectable } from '@angular/core';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadPointMapBusiness {
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
}
