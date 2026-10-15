import { Injectable } from '@angular/core';
import { RoadArea } from '../../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { Guid } from '../../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleRoadAreaDetailsManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  create(data: RoadArea) {
    data.Id = Guid.NewGuid().ToString('N');
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    return this.service.road.area.create(data);
  }

  update(data: RoadArea) {
    data.UpdateTime = new Date();
    return this.service.road.area.update(data);
  }
}
