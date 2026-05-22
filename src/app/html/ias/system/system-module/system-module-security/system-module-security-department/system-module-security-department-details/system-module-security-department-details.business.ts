import { Injectable } from '@angular/core';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleSecurityDepartmentDetailsBusiness {
  constructor(private service: ArmSystemRequestService) {}

  create(data: Department) {
    data.Id = '';
    data.GroupGuid = '';
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    return this.service.security.department.create(data);
  }

  update(data: Department) {
    data.UpdateTime = new Date();
    return this.service.security.department.update(data);
  }

  member = {
    remove: async (departmentId: string, data: DepartmentMember) => {
      if (data.DepartmentIds.length == 1) {
        return this.service.security.department.member.delete(data.Id);
      }

      let index = data.DepartmentIds.findIndex((x) => x == departmentId);
      if (index > -1) {
        data.DepartmentIds.splice(index, 1);
        return this.service.security.department.member.update(data);
      }
      return data;
    },
    delete: (id: string) => {
      return this.service.security.department.member.delete(id);
    },
    update: (data: DepartmentMember) => {
      data.UpdateTime = new Date();
      return this.service.security.department.member.update(data);
    },
  };
}
