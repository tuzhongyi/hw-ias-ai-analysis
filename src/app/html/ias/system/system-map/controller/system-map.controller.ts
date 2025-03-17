import { Injectable } from '@angular/core';
import { SystemMapAMapController } from './amap/system-map-amap.controller';
import { SystemMapPanelController } from './panel/system-map-panel.controller';
import { SystemMapWindowController } from './window/system-map-window.controller';

@Injectable()
export class SystemMapController {
  constructor(
    public amap: SystemMapAMapController,
    public panel: SystemMapPanelController,
    public window: SystemMapWindowController
  ) {}
}
