import { Injectable } from '@angular/core';
import { NetworkInterface } from '../../../../common/data-core/models/arm/network-interface.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementNetworkLocationTcpIpBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load() {
    return this.service.network.interface.array();
  }

  update(data: NetworkInterface) {
    return this.service.network.interface.update(data);
  }
}
