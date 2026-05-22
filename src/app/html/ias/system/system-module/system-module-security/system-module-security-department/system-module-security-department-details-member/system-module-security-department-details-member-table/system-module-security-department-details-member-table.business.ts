import { Injectable } from '@angular/core';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { GetDepartmentMembersParams } from '../../../../../../../../common/data-core/requests/services/system/security/system-security.params';
import { ArmSystemRequestService } from '../../../../../../../../common/data-core/requests/services/system/system.service';
import { SystemModuleSecurityDepartmentDetailsMemberTableArgs } from './system-module-security-department-details-member-table.model';

@Injectable()
export class SystemModuleSecurityDepartmentDetailsMemberTableBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(args: SystemModuleSecurityDepartmentDetailsMemberTableArgs) {
    let params = new GetDepartmentMembersParams();

    if (args.invert) {
      let all = await this.department.all();
      let ids = all.filter((x) => x.Id != args.departmentId).map((x) => x.Id);
      params.DepartmentIds = [...ids];
    } else {
      params.DepartmentIds = [args.departmentId];
    }
    return this.service.security.department.member.all(params);
  }

  private department = {
    all: () => {
      return this.service.security.department.cache.all();
    },
  };

  async test(args: SystemModuleSecurityDepartmentDetailsMemberTableArgs) {
    let result: DepartmentMember[] = [];
    for (let i = 0; i < 100; i++) {
      let item = new DepartmentMember();
      item.CreationTime = new Date();
      item.DepartmentIds = [args.departmentId];
      item.Id = (i + 1).toString();
      item.MobileNo = `13700000${item.Id.padStart(3, '0')}`;
      item.Name = `测试${item.Id.padStart(3, '0')}`;
      item.UpdateTime = new Date();
      result.push(item);
    }
    return result;
  }
}
