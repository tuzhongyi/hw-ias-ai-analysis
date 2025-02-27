import { Injectable } from '@angular/core';
import { Road } from '../../../../../../common/data-core/models/arm/analysis/road.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapPanel } from '../../system-map.model';
import { SystemMapPanelSourceRoadController } from './system-map-panel-source-road.controller';
import { SystemMapPanelSourceShopController } from './system-map-panel-source-shop.controller';

@Injectable()
export class SystemMapPanelSourceController extends SystemMapPanel {
  // load = new EventEmitter<SystemMapShopFilterArgs>();
  // select = new EventEmitter<Shop | Road>();
  // hover = new EventEmitter<Shop>();
  // out = new EventEmitter<Shop>();
  // position = new EventEmitter<Shop | Road>();

  constructor(
    public shop: SystemMapPanelSourceShopController,
    public road: SystemMapPanelSourceRoadController
  ) {
    super();
  }

  onselect(data: Shop | Road) {
    if (!data) {
      this.road.onselect();
    } else if (data instanceof Shop) {
      this.shop.onselect(data);
    } else if (data instanceof Road) {
      this.road.onselect(data);
    }
  }
  onposition(data: Shop | Road) {
    if (data instanceof Shop) {
      this.shop.onposition(data);
    } else if (data instanceof Road) {
      this.road.onposition(data);
    }
  }
}
