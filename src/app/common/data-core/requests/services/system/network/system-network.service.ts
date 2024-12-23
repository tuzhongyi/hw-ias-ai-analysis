import { instanceToPlain, plainToInstance } from 'class-transformer';
import { NetworkInterface } from '../../../../models/arm/network-interface.model';
import { SSH } from '../../../../models/arm/ssh.model';
import { NetworkCapability } from '../../../../models/capabilities/arm/network-capability.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';

export class SystemNetworkRequestService {
  constructor(private http: HowellHttpClient) {}

  capability() {
    let url = ArmSystemUrl.network.capability();
    return this.http.get<HowellResponse<NetworkCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, NetworkCapability);
    });
  }

  private _interface?: SystemNetworkInterfaceRequestService;
  public get interface(): SystemNetworkInterfaceRequestService {
    if (!this._interface) {
      this._interface = new SystemNetworkInterfaceRequestService(this.http);
    }
    return this._interface;
  }

  private _ssh?: SystemNetworkSSHRequestService;
  public get ssh(): SystemNetworkSSHRequestService {
    if (!this._ssh) {
      this._ssh = new SystemNetworkSSHRequestService(this.http);
    }
    return this._ssh;
  }
}
class SystemNetworkInterfaceRequestService {
  constructor(private http: HowellHttpClient) {}

  async array() {
    let url = ArmSystemUrl.network.interface.basic();
    let response = await this.http.get<HowellResponse<NetworkInterface[]>>(url);
    return plainToInstance(NetworkInterface, response.Data);
  }
  get(id: string) {
    let url = ArmSystemUrl.network.interface.item(id);
    return this.http.get<HowellResponse<NetworkInterface>>(url);
  }
  async update(item: NetworkInterface) {
    let plain = instanceToPlain(item);
    let url = ArmSystemUrl.network.interface.item(item.Id);
    let response = await this.http.put<any, HowellResponse<NetworkInterface>>(
      url,
      plain
    );
    return plainToInstance(NetworkInterface, response.Data);
  }
}
class SystemNetworkSSHRequestService {
  constructor(private http: HowellHttpClient) {}

  async get() {
    let url = ArmSystemUrl.network.ssh();
    let response = await this.http.get<HowellResponse<SSH>>(url);
    return plainToInstance(SSH, response.Data);
  }
  async update(data: SSH) {
    let plain = instanceToPlain(data);
    let url = ArmSystemUrl.network.ssh();
    let response = await this.http.put<any, HowellResponse<SSH>>(url, plain);
    return plainToInstance(SSH, response.Data);
  }
}
