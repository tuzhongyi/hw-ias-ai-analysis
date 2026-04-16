import { Injectable } from '@angular/core';
import { RoadObjectState } from '../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { IconTool } from '../../../../../../common/tools/icon-tool/icon.tool';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { SystemTaskRoadObjectHelper } from '../system-task-road-object-manager/system-task-road-object-manager.helper';
import { SystemTaskRoadObjectType } from '../system-task-road-object-manager/system-task-road-object-manager.model';
import { SystemTaskRoadObjectMapInfo } from './system-task-road-object-map-info.model';

@Injectable()
export class SystemTaskRoadObjectMapInfoBusiness {
  constructor(private language: LanguageTool) {}

  async load(data: RoadObject | RoadPoint | RoadSection) {
    let loader: Iloader<RoadObject | RoadPoint | RoadSection>;
    if (data instanceof RoadObject) {
      loader = new RoadObjectLoader(this.language, data);
    } else if (data instanceof RoadPoint) {
      loader = new RoadPointLoader(data);
    } else if (data instanceof RoadSection) {
      loader = new RoadSectionLoader(data);
    } else {
      return new SystemTaskRoadObjectMapInfo();
    }
    return loader.load();
  }
}

interface Iloader<T> {
  data: T;
  load(): Promise<SystemTaskRoadObjectMapInfo>;
}

class RoadObjectLoader implements Iloader<RoadObject> {
  constructor(private language: LanguageTool, public data: RoadObject) {}

  async load() {
    let info = new SystemTaskRoadObjectMapInfo();
    info.title = SystemTaskRoadObjectHelper.language.type(
      SystemTaskRoadObjectType.object
    );
    info.color = this.color();
    let type = {
      icon: IconTool.RoadObjectType(this.data.ObjectType),
      value: await this.language.road.object.ObjectTypes(this.data.ObjectType),
    };
    let name = {
      icon: 'mdi mdi-file-document-box',
      value: this.data.Name,
      classname: 'baseline',
    };

    info.items = [type, name];
    return info;
  }

  private color() {
    switch (this.data.ObjectState) {
      case RoadObjectState.Normal:
        return 'cyan';
      case RoadObjectState.Breakage:
        return 'orange';
      case RoadObjectState.Disappear:
        return 'red';
      default:
        return 'green';
    }
  }
  private icon(type: RoadObjectType) {}
}
class RoadPointLoader implements Iloader<RoadPoint> {
  constructor(public data: RoadPoint) {}

  async load() {
    let info = new SystemTaskRoadObjectMapInfo();
    info.title = SystemTaskRoadObjectHelper.language.type(
      SystemTaskRoadObjectType.point
    );
    return info;
  }
}
class RoadSectionLoader implements Iloader<RoadSection> {
  constructor(public data: RoadSection) {}

  async load() {
    let info = new SystemTaskRoadObjectMapInfo();
    info.title = SystemTaskRoadObjectHelper.language.type(
      SystemTaskRoadObjectType.section
    );
    return info;
  }
}
