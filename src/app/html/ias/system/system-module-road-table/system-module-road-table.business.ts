import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../common/data-core/requests/services/geographic/road/geographic-road.params';
import { SystemModuleRoadTableArgs } from './system-module-road-table.model';

@Injectable()
export class SystemModuleRoadTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load(index: number, size: number, args: SystemModuleRoadTableArgs) {
    let datas = await this.data(index, size, args);
    if (
      datas.Page.RecordCount == 0 &&
      datas.Page.TotalRecordCount > 0 &&
      datas.Page.PageIndex > 1
    ) {
      datas = await this.data(datas.Page.RecordCount, size, args);
    }

    return datas;
  }

  data(index: number, size: number, args: SystemModuleRoadTableArgs) {
    let params = new GetRoadsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Name = args.name;
    return this.service.road.list(params);
  }
}
