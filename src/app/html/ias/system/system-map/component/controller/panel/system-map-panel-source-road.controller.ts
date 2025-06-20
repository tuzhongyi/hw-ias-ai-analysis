import { EventEmitter, Injectable } from '@angular/core';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemMapShopArgs } from '../../business/shop/system-map-shop.model';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelSourceRoadController extends SystemMapPanel {
  load = new EventEmitter<SystemMapShopArgs>();
  select = new EventEmitter<Road>();
  position = new EventEmitter<Road>();

  constructor() {
    super();
  }
  onselect(data?: Road) {
    this.select.emit(data);
  }
  onposition(data: Road) {
    this.position.emit(data);
  }
}
