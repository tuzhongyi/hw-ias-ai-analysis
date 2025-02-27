import { Injectable } from '@angular/core';
import { Point } from '../../../../../common/data-core/models/arm/point.model';

@Injectable()
export class SystemModuleRoadMapPositionController {
  show = false;
  point = Point.create();
}
