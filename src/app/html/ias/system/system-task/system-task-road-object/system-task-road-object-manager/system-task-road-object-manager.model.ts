import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadObjectTableArgs } from '../../../system-module/system-module-road-object/system-module-road-object-table/system-module-road-object-table.model';
import { SystemModuleRoadPointTableArgs } from '../../../system-module/system-module-road-point/system-module-road-point-table/system-module-road-point-table.model';
import { SystemModuleRoadSectionTableArgs } from '../../../system-module/system-module-road-section/system-module-road-section-table/system-module-road-section-table.model';

export enum SystemTaskRoadObjectType {
  object,
  section,
  point,
}
export class SystemTaskRoadObjectManagerArgs {
  point = new SystemModuleRoadPointTableArgs();
  section = new SystemModuleRoadSectionTableArgs();
  object = new SystemModuleRoadObjectTableArgs();

  clear() {
    this.point = new SystemModuleRoadPointTableArgs();
    this.section = new SystemModuleRoadSectionTableArgs();
    this.object = new SystemModuleRoadObjectTableArgs();
  }
}

export class SystemTaskRoadObjectController<T> {
  constructor(public type: SystemTaskRoadObjectType) {}

  datas: T[] = [];
  selected?: T;
  enabled = true;
  loaded = false;
}
export class SystemTaskRoadController {
  [key: string]: SystemTaskRoadObjectController<any>;
  object = new SystemTaskRoadObjectController<RoadObject>(
    SystemTaskRoadObjectType.object
  );
  point = new SystemTaskRoadObjectController<RoadPoint>(
    SystemTaskRoadObjectType.point
  );
  section = new SystemTaskRoadObjectController<RoadSection>(
    SystemTaskRoadObjectType.section
  );
}
