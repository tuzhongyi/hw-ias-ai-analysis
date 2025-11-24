import { Injectable } from '@angular/core';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemMainManagerDeviceBusiness } from './device/system-main-manager-device.business';
import { SystemMainManagerMobileBusiness } from './mobile/system-main-manager-mobile.business';
import { SystemMainManagerSampleeBusiness } from './sample/system-main-manager-sample.business';
import { SystemMainManagerShopBusiness } from './shop/system-main-manager-shop.business';

@Injectable()
export class SystemMainManagerBusiness {
  shop: SystemMainManagerShopBusiness;
  device: SystemMainManagerDeviceBusiness;
  mobile: SystemMainManagerMobileBusiness;
  sample: SystemMainManagerSampleeBusiness;
  constructor(
    system: ArmSystemRequestService,
    geo: ArmGeographicRequestService,
    analysis: ArmAnalysisRequestService,
    source: SourceManager
  ) {
    this.shop = new SystemMainManagerShopBusiness(geo);
    this.device = new SystemMainManagerDeviceBusiness(system);
    this.mobile = new SystemMainManagerMobileBusiness(system, source);
    this.sample = new SystemMainManagerSampleeBusiness(analysis);
  }
}
