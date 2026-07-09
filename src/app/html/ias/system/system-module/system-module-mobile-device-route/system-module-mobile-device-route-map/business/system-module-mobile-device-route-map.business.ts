import { Injectable } from '@angular/core';

import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { SystemModuleMobileDeviceRouteMapGPSBusiness } from './system-module-mobile-device-route-map-gps.business';
import { SystemModuleMobileDeviceRouteMapPatrolBusiness } from './system-module-mobile-device-route-map-patrol.business';

@Injectable()
export class SystemModuleMobileDeviceRouteMapBusiness {
  route: SystemModuleMobileDeviceRouteMapGPSBusiness;
  patrol: SystemModuleMobileDeviceRouteMapPatrolBusiness;
  constructor(
    system: ArmSystemRequestService,
    geo: ArmGeographicRequestService,
  ) {
    this.route = new SystemModuleMobileDeviceRouteMapGPSBusiness(system);
    this.patrol = new SystemModuleMobileDeviceRouteMapPatrolBusiness(geo);
  }
}
