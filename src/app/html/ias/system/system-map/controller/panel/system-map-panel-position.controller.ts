import { Injectable } from '@angular/core';
import { Point } from '../../../../../../common/data-core/models/arm/point.model';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelPositionController extends SystemMapPanel {
  point = Point.create();
}
