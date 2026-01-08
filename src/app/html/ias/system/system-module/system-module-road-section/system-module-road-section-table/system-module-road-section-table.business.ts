import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadSectionsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-section/geographic-road-section.params';
import { SystemModuleRoadSectionTableArgs } from './system-module-road-section-table.model';

@Injectable()
export class SystemModuleRoadSectionTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load(args: SystemModuleRoadSectionTableArgs) {
    let datas = await this.data(args);
    return datas;
  }

  private data(args: SystemModuleRoadSectionTableArgs) {
    let params = new GetRoadSectionsParams();
    params.Name = args.name;
    return this.service.road.section.all(params);
  }
}
