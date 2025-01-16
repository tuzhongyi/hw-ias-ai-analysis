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

  constructor(private details: SystemMapPanelDetailsController) {
    super();
    this.show = true;
  }

  ondetails(data: Shop) {
    this.details.shop.data = data;
    this.details.shop.show = true;
  }
  onfilter(data: SystemMapShopFilterArgs) {
    this.details.shop.data = undefined;
    this.load.emit(data);
  }
}
