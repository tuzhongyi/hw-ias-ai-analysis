import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { SystemEventMapContainerRoadBusiness } from './system-event-map-container-road.business';

@Injectable()
export class SystemEventMapContainerBusiness {
  road: SystemEventMapContainerRoadBusiness;
  constructor(geo: ArmGeographicRequestService) {
    this.road = new SystemEventMapContainerRoadBusiness(geo);
  }
}
