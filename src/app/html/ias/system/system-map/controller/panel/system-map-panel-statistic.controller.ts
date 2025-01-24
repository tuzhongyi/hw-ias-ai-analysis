import { Injectable } from '@angular/core';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelStatisticController extends SystemMapPanel {
  count = {
    shop: 0,
  };

  constructor() {
    super();
    this.show = true;
  }
}
