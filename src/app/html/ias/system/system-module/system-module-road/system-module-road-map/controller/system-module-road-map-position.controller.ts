import { Injectable } from '@angular/core';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';

@Injectable()
export class SystemModuleRoadMapPositionController {
  show = false;
  point = HowellPoint.create();
}
