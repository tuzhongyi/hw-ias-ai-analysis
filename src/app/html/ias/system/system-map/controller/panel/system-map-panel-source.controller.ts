import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import {
  SystemMapPanel,
  SystemMapShopFilterArgs,
} from '../../system-map.model';
import { SystemMapPanelDetailsController } from './system-map-panel-details.controller';

@Injectable()
export class SystemMapPanelSourceController extends SystemMapPanel {
  load = new EventEmitter<SystemMapShopFilterArgs>();
  select = new EventEmitter<Shop>();
  hover = new EventEmitter<Shop>();
  out = new EventEmitter<Shop>();
  position = new EventEmitter<Shop>();

  constructor(private details: SystemMapPanelDetailsController) {
    super();
  }

  ondetails(data: Shop) {
    this.details.shop.data = data;
    this.details.shop.show = true;
    this.select.emit(data);
  }
  onmouseover(data: Shop) {
    this.hover.emit(data);
  }
  onmouseout(data: Shop) {
    this.out.emit(data);
  }
  onselect(data: Shop) {
    if (this.details.shop.show) {
      this.details.shop.data = data;
    }
    this.select.emit(data);
  }
  onposition(data: Shop) {
    this.position.emit(data);
  }
}
