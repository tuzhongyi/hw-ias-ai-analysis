import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { EnumTool } from '../../../../../../common/tools/enum-tool/enum.tool';
import { SystemTaskRoadObjectType } from '../system-task-road-object-manager/system-task-road-object-manager.model';

@Injectable()
export class SystemTaskRoadObjectOperationSource {
  types: EnumNameValue<number>[] = [];
  point = {
    types: [] as EnumNameValue<number>[],
  };
  object = {
    types: [] as EnumNameValue<number>[],
    states: [] as EnumNameValue<number>[],
  };
  section = {
    types: [] as EnumNameValue<number>[],
  };

  constructor(private manager: Manager) {
    this.init.types();
    this.init.object();
    this.init.section();
    this.init.point();
  }

  private init = {
    types: () => {
      let values = EnumTool.values(SystemTaskRoadObjectType);
      this.types = values.map<EnumNameValue<number>>((x) => {
        let name = '';
        switch (x) {
          case SystemTaskRoadObjectType.object:
            name = '道路固件';
            break;
          case SystemTaskRoadObjectType.section:
            name = '屏蔽路段';
            break;
          case SystemTaskRoadObjectType.point:
            name = '道路屏蔽点';
            break;
          default:
            break;
        }
        return {
          Name: name,
          Value: x,
        };
      });
    },
    point: () => {
      this.manager.source.road.point.RoadPointTypes.get().then((x) => {
        this.point.types = x;
      });
    },
    section: () => {
      this.manager.source.road.section.RoadSectionTypes.get().then((x) => {
        this.section.types = x;
      });
    },
    object: () => {
      this.manager.source.road.object.ObjectTypes.get().then((x) => {
        this.object.types = x;
      });
      this.manager.source.road.object.ObjectStates.get().then((x) => {
        this.object.states = x;
      });
    },
  };
}
