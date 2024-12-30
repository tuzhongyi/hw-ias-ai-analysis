import { instanceToPlain } from 'class-transformer';
import { HowellResponse } from '../../../../models/response';
import { UserGroup } from '../../../../models/user/user-group.model';
import { User } from '../../../../models/user/user.model';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';

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
    let plain = instanceToPlain(user);
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
    let plain = instanceToPlain(user);
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
  async group() {
    let url = ArmSystemUrl.security.user.group();
    return this.http.get<HowellResponse<UserGroup[]>>(url).then((response) => {
      return HowellResponseProcess.array(response, UserGroup);
    });
  }
}
