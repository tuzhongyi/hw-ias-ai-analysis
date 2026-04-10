import { Injectable } from '@angular/core';
import { SystemModuleRoadObjectTableBusiness } from '../../../system-module/system-module-road-object/system-module-road-object-table/system-module-road-object-table.business';
import { SystemModuleRoadPointTableBusiness } from '../../../system-module/system-module-road-point/system-module-road-point-table/system-module-road-point-table.business';
import { SystemModuleRoadSectionTableBusiness } from '../../../system-module/system-module-road-section/system-module-road-section-table/system-module-road-section-table.business';

@Injectable()
export class SystemTaskRoadObjectManagerBusiness {
  constructor(
    public object: SystemModuleRoadObjectTableBusiness,
    public point: SystemModuleRoadPointTableBusiness,
    public section: SystemModuleRoadSectionTableBusiness
  ) {}
}
