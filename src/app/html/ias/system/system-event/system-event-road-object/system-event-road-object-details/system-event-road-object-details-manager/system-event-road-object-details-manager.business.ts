import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemEventRoadObjectDetailsManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}
  get(id: string) {
    return this.service.road.object.cache.get(id);
  }
}
