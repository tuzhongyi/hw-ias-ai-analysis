import { HowellPoint } from '../../../../../../../../common/data-core/models/arm/point.model';

export class SystemModuleRoadObjectDetailsMapLinePositionController {
  show = false;
  point = {
    saved: HowellPoint.create(),
    current: HowellPoint.create(),
  };
  distance = 0;
}
