import { Injectable } from '@angular/core';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelStateController extends SystemMapPanel {
  constructor() {
    super();
    this.show = true;
  }
}
