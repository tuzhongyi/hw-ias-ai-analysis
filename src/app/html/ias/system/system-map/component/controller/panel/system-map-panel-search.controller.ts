import { Injectable } from '@angular/core';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelSearchController extends SystemMapPanel {
  constructor() {
    super();
    this.show = true;
  }
}
