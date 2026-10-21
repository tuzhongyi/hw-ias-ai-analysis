import { Injectable } from '@angular/core';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadAreaDetailsMapBusiness {
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

  /** 已有区域，新建时铺在地图上当参照。一条都没有也正常，所以不像 road() 那样报错 */
  async areas() {
    return this.service.geo.road.area.all();
  }
}
