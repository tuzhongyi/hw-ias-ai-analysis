import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadPointMapBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async road() {
    let datas = await this.service.road.cache.all();
    if (datas.length == 0) {
      throw new Error();
    }
    return datas;
  }
}
