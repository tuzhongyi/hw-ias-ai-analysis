import { Injectable } from '@angular/core';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { ArmGeographicRequestService } from '../../../../common/data-core/requests/services/geographic/geographic.service';
import { Guid } from '../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleRoadInfoBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  create(data: Road) {
    data.Id = Guid.NewGuid().ToString('N');
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    return this.service.road.create(data);
  }

  update(data: Road) {
    data.UpdateTime = new Date();
    return this.service.road.update(data);
  }
}
