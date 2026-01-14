import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  delete(id: string) {
    return this.service.road.object.delete(id);
  }
}
