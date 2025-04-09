import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  delete(id: string) {
    return this.service.road.delete(id);
  }
}
