import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadSectionDetailsMapBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  road() {
    return this.service.road.cache.all();
  }
}
