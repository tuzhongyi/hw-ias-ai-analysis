import { instanceToPlain } from 'class-transformer';
import { DeviceInfo } from '../../../../models/arm/device-info.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';

export class SystemDeviceRequestService {
  constructor(private http: HowellHttpClient) {}
  async get() {
    let url = ArmSystemUrl.device();
    let response = await this.http.get<HowellResponse<DeviceInfo>>(url);
    return HowellResponseProcess.item(response, DeviceInfo);
  }
  async update(item: DeviceInfo) {
    let plain = instanceToPlain(item);
    let url = ArmSystemUrl.device();
    let response = await this.http.put<any, HowellResponse<DeviceInfo>>(
      url,
      plain
    );
    return HowellResponseProcess.item(response, DeviceInfo);
  }
}
