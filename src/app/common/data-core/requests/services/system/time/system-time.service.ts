import { instanceToPlain, plainToInstance } from 'class-transformer';
import { SystemTime } from '../../../../models/arm/system-time.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';

export class SystemTimeRequestService {
  constructor(private http: HowellHttpClient) {}
  async get() {
    let url = ArmSystemUrl.time();
    let response = await this.http.get<HowellResponse<SystemTime>>(url);
    return plainToInstance(SystemTime, response.Data);
  }
  async update(item: SystemTime) {
    let plain = instanceToPlain(item);
    let url = ArmSystemUrl.time();
    let response = await this.http.put<any, HowellResponse<SystemTime>>(
      url,
      plain
    );
    return HowellResponseProcess.item(response, SystemTime);
  }
}
