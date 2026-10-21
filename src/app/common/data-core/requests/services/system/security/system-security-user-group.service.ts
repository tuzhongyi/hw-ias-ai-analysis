import { instanceToPlain } from 'class-transformer';
import { ObjectTool } from '../../../../../tools/object-tool/object.tool';
import { HowellResponse } from '../../../../models/response';
import { UserGroup } from '../../../../models/user/user-group.model';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';

export class SystemSecurityUserGroupRequestService {
  constructor(private http: HowellHttpClient) {}
  async array() {
    let url = ArmSystemUrl.security.user.group.basic();
    return this.http.get<HowellResponse<UserGroup[]>>(url).then((response) => {
      return HowellResponseProcess.array(response, UserGroup);
    });
  }

  async create(data: UserGroup) {
    let url = ArmSystemUrl.security.user.group.basic();
    let _data = ObjectTool.serialize(data, UserGroup);
    let plain = instanceToPlain(_data);
    return this.http
      .post<HowellResponse<UserGroup>, any>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, UserGroup);
      });
  }
  async get(id: string) {
    let url = ArmSystemUrl.security.user.group.item(id);
    return this.http.get<HowellResponse<UserGroup>>(url).then((response) => {
      return HowellResponseProcess.item(response, UserGroup);
    });
  }
  async update(data: UserGroup) {
    let url = ArmSystemUrl.security.user.group.item(data.GroupId);
    let _data = ObjectTool.serialize(data, UserGroup);
    let plain = instanceToPlain(_data);
    return this.http
      .put<any, HowellResponse<UserGroup>>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, UserGroup);
      });
  }
  async delete<T>(id: T) {
    let url = ArmSystemUrl.security.user.group.item(id);
    return this.http.delete<HowellResponse<UserGroup>>(url).then((response) => {
      return HowellResponseProcess.item(response, UserGroup);
    });
  }
}
