import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { ShopTaskCompareResult } from '../../../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
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
