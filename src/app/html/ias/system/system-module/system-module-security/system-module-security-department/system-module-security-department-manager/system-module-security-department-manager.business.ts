import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleSecurityDepartmentManagerBusiness {
  constructor(private service: ArmSystemRequestService) {}

  delete(id: string) {
    return this.service.security.department.delete(id);
  }
}
