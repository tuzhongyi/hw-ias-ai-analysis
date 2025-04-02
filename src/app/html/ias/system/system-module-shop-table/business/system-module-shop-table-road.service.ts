import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../../common/data-core/requests/services/geographic/road/geographic-road.params';

@Injectable()
export class SystemModuleShopTableRoadService {
  constructor(private service: ArmGeographicRequestService) {}

  load(name: string) {
    let params = new GetRoadsParams();
    params.Name = name;
    return this.service.road.all(params);
  }
}
