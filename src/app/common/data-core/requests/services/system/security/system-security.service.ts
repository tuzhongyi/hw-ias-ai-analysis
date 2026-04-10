import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ObjectTool } from '../../../../../tools/object-tool/object.tool';
import { Authentication } from '../../../../models/arm/authentication.model';
import { SecurityCapability } from '../../../../models/capabilities/arm/security-capability.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { SystemSecurityUserRequestService } from './system-security-user.service';

export class SystemSecurityRequestService {
  constructor(private http: HowellHttpClient) {}
  async capability() {
    let url = ArmSystemUrl.security.capability();
    return this.http
      .get<HowellResponse<SecurityCapability>>(url)
      .then((response) => {
        return HowellResponseProcess.item(response, SecurityCapability);
      });
  }
  authentication = {
    get: () => {
      let url = ArmSystemUrl.security.authentication();
      return this.http.get<HowellResponse<Authentication>>(url);
    },
    update: async (data: Authentication) => {
      let url = ArmSystemUrl.security.authentication();
      let _data = ObjectTool.serialize(data, Authentication);
      let plain = instanceToPlain(_data);
      let response = await this.http.put<any, HowellResponse<Authentication>>(
        url,
        plain
      );
      return plainToInstance(Authentication, response.Data);
    },
  };
  private _user?: SystemSecurityUserRequestService;
  public get user(): SystemSecurityUserRequestService {
    if (!this._user) {
      this._user = new SystemSecurityUserRequestService(this.http);
    }
    return this._user;
  }
}
