import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../../../common/data-core/requests/services/geographic/road/geographic-road.params';
import { SystemModuleRoadTableArgs } from './system-module-road-table.model';

@Injectable()
export class SystemModuleRoadTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load(args: SystemModuleRoadTableArgs) {
    let datas = await this.data(args);
    return datas;
  }

  private data(args: SystemModuleRoadTableArgs) {
    let params = new GetRoadsParams();
    params.Name = args.name;
    return this.service.road.all(params);
  }
}
