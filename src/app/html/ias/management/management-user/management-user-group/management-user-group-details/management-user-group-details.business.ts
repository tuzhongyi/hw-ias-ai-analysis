import { Injectable } from '@angular/core';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementUserGroupDetailsBusiness {
  constructor(private service: ArmSystemRequestService) {}

  create(data: UserGroup) {
    // GroupId 是服务端分配的只读字段，新建时不要带上去
    let group = new UserGroup();
    group.GroupName = data.GroupName;
    group.DivisionIds = data.DivisionIds;
    return this.service.security.user.groupCreate(group);
  }

  update(data: UserGroup) {
    let group = new UserGroup();
    group.GroupId = data.GroupId;
    group.GroupName = data.GroupName;
    group.DivisionIds = data.DivisionIds;
    return this.service.security.user.groupUpdate(group);
  }
}
