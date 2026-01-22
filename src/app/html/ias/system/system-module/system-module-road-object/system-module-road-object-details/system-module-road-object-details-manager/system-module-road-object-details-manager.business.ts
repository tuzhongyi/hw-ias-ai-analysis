import { Injectable } from '@angular/core';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { Guid } from '../../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleRoadObjectDetailsManagerBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private medium: MediumRequestService
  ) {}

  create(data: RoadObject) {
    data.Id = Guid.NewGuid().ToString('N');
    data.UpdateTime = new Date();
    data.CreationTime = new Date();
    return this.service.road.object.create(data);
  }

  update(data: RoadObject) {
    data.UpdateTime = new Date();
    return this.service.road.object.update(data);
  }

  picture = {
    upload: (data: ArrayBuffer) => {
      return this.medium.upload(data);
    },
  };
}
