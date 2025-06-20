import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/geographic-road.params';

@Injectable()
export class SystemTaskShopRegistrationManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    let params = new GetRoadsParams();
    return this.service.road.cache.array(params);
  }
}
