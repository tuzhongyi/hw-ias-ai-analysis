import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectStockManagerBusiness {
  constructor(private geographic: ArmGeographicRequestService) {}

  delete(id: string) {
    return this.geographic.road.object.stock.delete(id);
  }
}
