import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../../../../../common/data-core/requests/services/geographic/road/geographic-road.params';
import { SystemTaskShopRegistrationManagerAnalysisBusiness } from './system-task-shop-registration-manager-analysis.business';

@Injectable()
export class SystemTaskShopRegistrationManagerBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    public analysis: SystemTaskShopRegistrationManagerAnalysisBusiness
  ) {}

  load() {
    let params = new GetRoadsParams();
    return this.service.road.cache.array(params);
  }
}
