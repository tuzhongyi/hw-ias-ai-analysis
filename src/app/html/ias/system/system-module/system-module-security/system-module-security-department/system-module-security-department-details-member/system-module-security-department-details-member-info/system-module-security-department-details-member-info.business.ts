import { Injectable } from '@angular/core';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { ArmSystemRequestService } from '../../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleSecurityDepartmentDetailsMemberInfoBusiness {
  constructor(private service: ArmSystemRequestService) {}

  create(data: DepartmentMember) {
    data.Id = '';
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    return this.service.security.department.member.create(data);
  }

  update(data: DepartmentMember) {
    data.UpdateTime = new Date();
    return this.service.security.department.member.update(data);
  }
}
