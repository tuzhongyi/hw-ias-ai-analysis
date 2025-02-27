import { Injectable } from '@angular/core';
import { SystemTime } from '../../../../common/data-core/models/arm/system-time.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementSystemDeviceDatetimeBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load() {
    return this.service.time.get();
  }

  async update(data: SystemTime) {
    return this.service.time.update(data);
  }
}
