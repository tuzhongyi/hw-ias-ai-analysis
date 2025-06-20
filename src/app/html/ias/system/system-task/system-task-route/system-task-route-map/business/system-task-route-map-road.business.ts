import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemTaskRouteMapRoadBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    return this.service.road.all();
  }
}
