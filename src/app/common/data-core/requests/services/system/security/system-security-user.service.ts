import { instanceToPlain } from 'class-transformer';
import { ObjectTool } from '../../../../../tools/object-tool/object.tool';
import { HowellResponse } from '../../../../models/response';
import { User } from '../../../../models/user/user.model';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { SystemSecurityUserGroupRequestService } from './system-security-user-group.service';

export class SystemSecurityUserRequestService {
  constructor(private http: HowellHttpClient) {}
  async array() {
    let url = ArmSystemUrl.security.user.basic();
    return this.http.get<HowellResponse<User[]>>(url).then((response) => {
      return HowellResponseProcess.array(response, User);
    });
  }

  async create(user: User) {
    let url = ArmSystemUrl.security.user.basic();
    let _data = ObjectTool.serialize(user, User);
    let plain = instanceToPlain(_data);
    return this.http
      .post<HowellResponse<User>, any>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, User);
      })
      .catch((e) => {
        if (e.response.status === 406) {
          if (
            e.response.data &&
            e.response.data.InnerException &&
            e.response.data.InnerException.Message
          ) {
            throw new Error(e.response.data.InnerException.Message);
          }
        }
        throw e;
      });
  }
  async get(idorusername: string) {
    let url = ArmSystemUrl.security.user.item(idorusername);
    return this.http.get<HowellResponse<User>>(url).then((response) => {
      return HowellResponseProcess.item(response, User);
    });
  }
  async update(user: User) {
    let url = ArmSystemUrl.security.user.item(user.Id);
    let _data = ObjectTool.serialize(user, User);
    let plain = instanceToPlain(_data);
    return this.http
      .put<any, HowellResponse<User>>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, User);
      });
  }
  async delete(id: string) {
    let url = ArmSystemUrl.security.user.item(id);
    return this.http.delete(url);
  }

  private _group?: SystemSecurityUserGroupRequestService;
  public get group(): SystemSecurityUserGroupRequestService {
    if (!this._group) {
      this._group = new SystemSecurityUserGroupRequestService(this.http);
    }
    return this._group;
  }
}
