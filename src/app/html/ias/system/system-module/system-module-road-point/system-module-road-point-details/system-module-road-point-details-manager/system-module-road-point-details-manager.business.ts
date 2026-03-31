import { Injectable } from '@angular/core';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { Guid } from '../../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleRoadPointDetailsManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  create(data: RoadPoint) {
    data.Id = Guid.NewGuid().ToString('N');
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    return this.service.road.point.create(data);
  }

  update(data: RoadPoint) {
    data.UpdateTime = new Date();
    return this.service.road.point.update(data);
  }
}
