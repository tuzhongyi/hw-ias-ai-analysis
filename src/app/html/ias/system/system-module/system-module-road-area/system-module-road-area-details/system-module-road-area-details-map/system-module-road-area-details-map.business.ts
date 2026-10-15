import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadAreaDetailsMapBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async road() {
    let datas = await this.service.road.cache.all();
    if (datas.length == 0) {
      throw new Error();
    }
    return datas;
  }

  /** 已有区域，新建时铺在地图上当参照。一条都没有也正常，所以不像 road() 那样报错 */
  async areas() {
    return this.service.road.area.all();
  }
}
