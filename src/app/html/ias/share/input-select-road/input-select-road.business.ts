import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../common/data-core/requests/services/geographic/road/geographic-road.params';

@Injectable()
export class InputSelectRoadBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  by = {
    name: (name: string) => {
      let params = new GetRoadsParams();
      params.Name = name;
      return this.service.road.all(params);
    },
    id: (id: string) => {
      let params = new GetRoadsParams();
      params.Ids = [id];
      return this.service.road.all(params);
    },
  };
}
