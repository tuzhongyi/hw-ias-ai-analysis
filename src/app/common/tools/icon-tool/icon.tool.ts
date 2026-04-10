import { RoadObjectType } from '../../data-core/enums/road/road-object/road-object-type.enum';

export class IconTool {
  static RoadObjectType(value?: RoadObjectType) {
    switch (value) {
      case RoadObjectType.FireHydrant:
        return 'howell-icon-fire-hydrant';
      case RoadObjectType.BusStation:
        return 'howell-icon-bus_stop';
      case RoadObjectType.Passage:
        return 'howell-icon-exit';
      case RoadObjectType.TelephoneBooth:
        return 'howell-icon-telephone';
      case RoadObjectType.TrashCan:
        return 'howell-icon-delete-bin';
      default:
        return '';
    }
  }
}
