import { Injectable } from '@angular/core';
import { SystemAMapController } from './amap/system-map-amap.controller';
import { SystemMapPanelController } from './panel/system-map-panel.controller';

@Injectable()
export class SystemMapController {
  constructor(
    public amap: SystemAMapController,
    public panel: SystemMapPanelController
  ) {}
}
