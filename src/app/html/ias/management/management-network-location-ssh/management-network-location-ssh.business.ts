import { Injectable } from '@angular/core';
import { SSH } from '../../../../common/data-core/models/arm/ssh.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementNetworkLocationSSHBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load() {
    return this.service.network.ssh.get();
  }

  update(data: SSH) {
    return this.service.network.ssh.update(data);
  }
}
