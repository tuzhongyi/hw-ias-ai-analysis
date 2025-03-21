import { Injectable } from '@angular/core';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelPositionController extends SystemMapPanel {
  point = HowellPoint.create();
}
