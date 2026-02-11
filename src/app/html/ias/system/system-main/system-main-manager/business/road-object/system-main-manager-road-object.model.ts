import { RoadObjectState } from '../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';

export class SystemMainManagerRoadObjectArgs {
  states? = [
    RoadObjectState.None,
    RoadObjectState.Normal,
    RoadObjectState.Breakage,
    RoadObjectState.Disappear,
  ];
}
