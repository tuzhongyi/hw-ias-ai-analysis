import { Injectable } from '@angular/core';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { Guid } from '../../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleRoadSectionDetailsManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  create(data: RoadSection) {
    data.Id = Guid.NewGuid().ToString('N');
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    return this.service.road.section.create(data);
  }

  update(data: RoadSection) {
    data.UpdateTime = new Date();
    return this.service.road.section.update(data);
  }
}
