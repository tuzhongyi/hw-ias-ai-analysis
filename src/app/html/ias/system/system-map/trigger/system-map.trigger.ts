import { Injectable } from '@angular/core';
import { SystemMapAMapTrigger } from './system-map-amap.trigger';
import { SystemMapPanelTrigger } from './system-map-panel.trigger';

@Injectable()
export class SystemMapTrigger {
  constructor(
    public amap: SystemMapAMapTrigger,
    public panel: SystemMapPanelTrigger
  ) {}

  init() {
    this.amap.init();
  }
}
