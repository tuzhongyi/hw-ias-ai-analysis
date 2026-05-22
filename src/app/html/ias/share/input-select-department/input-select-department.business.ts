import { Injectable } from '@angular/core';
import { GetDepartmentsParams } from '../../../../common/data-core/requests/services/system/security/system-security.params';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class InputSelectDepartmentBusiness {
  constructor(private service: ArmSystemRequestService) {}

  all() {
    let params = new GetDepartmentsParams();
    return this.service.security.department.all(params);
  }

  by = {
    name: (name: string) => {
      let params = new GetDepartmentsParams();
      params.Name = name;
      return this.service.security.department.all(params);
    },
  };
}
