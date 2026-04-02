import { SystemModuleRoadObjectTableArgs } from '../../../system-module/system-module-road-object/system-module-road-object-table/system-module-road-object-table.model';
import { SystemModuleRoadPointTableArgs } from '../../../system-module/system-module-road-point/system-module-road-point-table/system-module-road-point-table.model';
import { SystemModuleRoadSectionTableArgs } from '../../../system-module/system-module-road-section/system-module-road-section-table/system-module-road-section-table.model';

export enum SystemTaskRoadObjectType {
  object,
  section,
  point,
}
export class SystemTaskRoadObjectManagerArgs {
  type = SystemTaskRoadObjectType.object;
  point = new SystemModuleRoadPointTableArgs();
  section = new SystemModuleRoadSectionTableArgs();
  object = new SystemModuleRoadObjectTableArgs();
}
