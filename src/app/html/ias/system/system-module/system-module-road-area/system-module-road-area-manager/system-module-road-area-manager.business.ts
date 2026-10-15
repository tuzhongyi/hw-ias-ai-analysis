import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadAreaManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  delete(id: string) {
    return this.service.road.area.delete(id);
  }
}
