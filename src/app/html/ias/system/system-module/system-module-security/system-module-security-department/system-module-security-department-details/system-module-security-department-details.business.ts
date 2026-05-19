import { Injectable } from '@angular/core';
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
    delete: (id: string) => {
      return this.service.security.department.member.delete(id);
    },
  };
}
