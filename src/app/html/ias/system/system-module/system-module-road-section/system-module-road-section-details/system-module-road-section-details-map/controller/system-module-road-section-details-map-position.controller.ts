import { Injectable } from '@angular/core';
import { HowellPoint } from '../../../../../../../../common/data-core/models/arm/point.model';

@Injectable()
export class SystemModuleRoadSectionDetailsMapPositionController {
  show = false;
  point = {
    saved: HowellPoint.create(),
    current: HowellPoint.create(),
  };
  distance = 0;
}
