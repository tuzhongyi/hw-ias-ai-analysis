import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import {
  SystemMapPanel,
  SystemMapShopFilterArgs,
} from '../../system-map.model';
import { SystemMapAMapController } from '../amap/system-map-amap.controller';
import { SystemMapPanelDetailsController } from './system-map-panel-details.controller';

@Injectable()
export class SystemMapPanelSourceController extends SystemMapPanel {
  load = new EventEmitter<SystemMapShopFilterArgs>();

  constructor(
    private details: SystemMapPanelDetailsController,
    private amap: SystemMapAMapController
  ) {
    super();
  }

  ondetails(data: Shop) {
    this.details.shop.data = data;
    this.details.shop.show = true;
    this.amap.point.select(data);
  }
  onfilter(data: SystemMapShopFilterArgs) {
    this.details.shop.data = undefined;
    this.load.emit(data);
  }
  onmouseover(data: Shop) {
    this.amap.point.hover(data);
  }
  onmouseout(data: Shop) {
    this.amap.point.out(data);
  }
  onselect(data: Shop) {
    if (this.details.shop.show) {
      this.details.shop.data = data;
    }
    this.amap.point.select(data);
  }
  onposition(data: Shop) {
    if (data.Location) {
      this.amap.center(data.Location);
    }
  }
}
