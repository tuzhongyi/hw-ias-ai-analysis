import { Injectable } from '@angular/core';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementUserGroupDetailsBusiness {
  constructor(private service: ArmSystemRequestService) {}

  create(data: UserGroup) {
    return this.service.security.user.group.create(data);
  }

  update(data: UserGroup) {
    return this.service.security.user.group.update(data);
  }
}
