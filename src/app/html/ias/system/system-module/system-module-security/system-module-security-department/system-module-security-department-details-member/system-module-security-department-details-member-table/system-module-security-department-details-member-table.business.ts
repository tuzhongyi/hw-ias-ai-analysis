import { Injectable } from '@angular/core';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { GetDepartmentMembersParams } from '../../../../../../../../common/data-core/requests/services/system/security/system-security.params';
import { ArmSystemRequestService } from '../../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleSecurityDepartmentDetailsMemberTableBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(departmentId: string) {
    let params = new GetDepartmentMembersParams();
    params.DepartmentIds = [departmentId];
    return this.service.security.department.member.all(params);
  }

  async test(departmentId: string) {
    let result: DepartmentMember[] = [];
    for (let i = 0; i < 100; i++) {
      let item = new DepartmentMember();
      item.CreationTime = new Date();
      item.DepartmentIds = [departmentId];
      item.Id = (i + 1).toString();
      item.MobileNo = `13700000${item.Id.padStart(3, '0')}`;
      item.Name = `测试${item.Id.padStart(3, '0')}`;
      item.UpdateTime = new Date();
      result.push(item);
    }
    return result;
  }
}
