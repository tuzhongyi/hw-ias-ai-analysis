import { Injectable } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
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

  onselect(data: IShop | Road) {
    if (!data) {
      this.road.onselect();
    } else if (data instanceof Road) {
      this.road.onselect(data);
    } else {
      this.shop.onselect(data);
    }
  }
  onposition(data: IShop | Road) {
    if (data instanceof Road) {
      this.road.onposition(data);
    } else {
      this.shop.onposition(data);
    }
  }
}
