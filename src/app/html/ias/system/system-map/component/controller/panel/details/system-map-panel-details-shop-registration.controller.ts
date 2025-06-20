import { Injectable } from '@angular/core';
import { ShopTaskCompareResult } from '../../../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { ShopRegistration } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemMapPanel } from '../../../system-map.model';

@Injectable()
export class SystemMapPanelDetailsShopRegistrationController extends SystemMapPanel {
  constructor() {
    super();
  }

  datas: ShopTaskCompareResult[] = [];

  data?: ShopRegistration;

  clear() {
    this.data = undefined;
  }
}
