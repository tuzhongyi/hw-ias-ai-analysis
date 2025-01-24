import { Injectable } from '@angular/core';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelControlsController extends SystemMapPanel {
  constructor() {
    super();
    this.show = true;
  }
}
