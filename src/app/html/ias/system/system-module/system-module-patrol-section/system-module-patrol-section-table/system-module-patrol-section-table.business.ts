import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetPatrolSectionsParams } from '../../../../../../common/data-core/requests/services/geographic/patrol/patrol-section/geographic-patrol-section.params';
import { SystemModulePatrolSectionTableArgs } from '../system-module-patrol-section.model';

@Injectable()
export class SystemModulePatrolSectionTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(args: SystemModulePatrolSectionTableArgs) {
    let params = new GetPatrolSectionsParams();
    params.Name = args.name;
    return this.service.patrol.section.cache.all(params);
  }
}
