import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class ManagementNetworkLocationTcpIpSource {
  constructor(manager: Manager) {
    this.speeds = new Promise((resolve) => {
      manager.capability.network.get().then((x) => {
        if (x.NetworkInterfaceSpeeds) {
          resolve(x.NetworkInterfaceSpeeds);
        }
      });
    });
    this.duplexs = new Promise((resolve) => {
      manager.capability.network.get().then((x) => {
        if (x.NetworkInterfaceDuplexs) {
          resolve(x.NetworkInterfaceDuplexs);
        }
      });
    });
    this.types = new Promise((resolve) => {
      manager.capability.network.get().then((x) => {
        if (x.AddressingTypes) {
          resolve(x.AddressingTypes);
        }
      });
    });
  }
  speeds: Promise<EnumNameValue[]>;
  duplexs: Promise<EnumNameValue[]>;
  types: Promise<EnumNameValue[]>;
}
