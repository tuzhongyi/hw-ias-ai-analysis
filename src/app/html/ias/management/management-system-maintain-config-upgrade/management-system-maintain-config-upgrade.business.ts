import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementSystemMaintainConfigUpgradeBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load() {
    return this.service.status.upgrade();
  }
}
