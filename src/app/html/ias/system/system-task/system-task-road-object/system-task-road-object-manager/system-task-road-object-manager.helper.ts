import { SystemTaskRoadObjectType } from './system-task-road-object-manager.model';

export class SystemTaskRoadObjectHelper {
  static language = {
    type: (value?: SystemTaskRoadObjectType, def = '') => {
      switch (value) {
        case SystemTaskRoadObjectType.object:
          return '道路部件';
        case SystemTaskRoadObjectType.section:
          return '屏蔽路段';
        case SystemTaskRoadObjectType.point:
          return '道路屏蔽点';
        default:
          return def;
      }
    },
  };
}
