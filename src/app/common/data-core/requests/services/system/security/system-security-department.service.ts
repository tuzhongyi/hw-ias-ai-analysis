import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { Department } from '../../../../models/arm/security/department.model';
import { PagedList } from '../../../../models/interface/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { SystemSecurityDepartmentMemberRequestService } from './system-security-department-member.service';
import { GetDepartmentsParams } from './system-security.params';

export class SystemSecurityDepartmentRequestService {
  constructor(private http: HowellHttpClient) {}

  async create(data: Department) {
    let url = ArmSystemUrl.security.department.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<Department>, any>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, Department);
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
    let url = ArmSystemUrl.security.department.item(idorusername);
    return this.http.get<HowellResponse<Department>>(url).then((response) => {
      return HowellResponseProcess.item(response, Department);
    });
  }
  async update(data: Department) {
    let url = ArmSystemUrl.security.department.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<Department>>(url, plain)
      .then((response) => {
        return HowellResponseProcess.item(response, Department);
      });
  }
  async delete(id: string) {
    let url = ArmSystemUrl.security.department.item(id);
    return this.http.delete(url);
  }

  async list(params: GetDepartmentsParams) {
    let url = ArmSystemUrl.security.department.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<Department>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, Department);
      });
  }

  all(params: GetDepartmentsParams) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  private _member?: SystemSecurityDepartmentMemberRequestService;
  public get member(): SystemSecurityDepartmentMemberRequestService {
    if (!this._member) {
      this._member = new SystemSecurityDepartmentMemberRequestService(
        this.http
      );
    }
    return this._member;
  }
}
