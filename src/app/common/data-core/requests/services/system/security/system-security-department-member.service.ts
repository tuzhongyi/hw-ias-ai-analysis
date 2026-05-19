import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../tools/service-tool/service.tool';

import { DepartmentMember } from '../../../../models/arm/security/department-member.model';
import { PagedList } from '../../../../models/interface/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { GetDepartmentMembersParams } from './system-security.params';

export class SystemSecurityDepartmentMemberRequestService {
  constructor(private http: HowellHttpClient) {}

  async create(user: DepartmentMember) {
    let url = ArmSystemUrl.security.department.member.basic();
    let plain = instanceToPlain(user);
    return this.http
      .post<HowellResponse<DepartmentMember>, any>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, DepartmentMember);
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
    let url = ArmSystemUrl.security.department.member.item(idorusername);
    return this.http
      .get<HowellResponse<DepartmentMember>>(url)
      .then((response) => {
        return HowellResponseProcess.item(response, DepartmentMember);
      });
  }
  async update(user: DepartmentMember) {
    let url = ArmSystemUrl.security.department.member.item(user.Id);
    let plain = instanceToPlain(user);
    return this.http
      .put<any, HowellResponse<DepartmentMember>>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, DepartmentMember);
      });
  }
  async delete(id: string) {
    let url = ArmSystemUrl.security.department.member.item(id);
    return this.http
      .delete<HowellResponse<DepartmentMember>>(url)
      .then((response) => {
        return HowellResponseProcess.item(response, DepartmentMember);
      });
  }

  async list(params: GetDepartmentMembersParams) {
    let url = ArmSystemUrl.security.department.member.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<DepartmentMember>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, DepartmentMember);
      });
  }

  all(params: GetDepartmentMembersParams) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }
}
