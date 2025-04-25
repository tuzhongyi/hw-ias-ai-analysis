import { Injectable } from '@angular/core';
import { User } from '../../../../common/data-core/models/user/user.model';
import { HowellSM4 } from '../../../../common/data-core/requests/auth/howell-sm4';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';
import { Guid } from '../../../../common/tools/guid/guid';

@Injectable()
export class ManagementUserInfoDetailsBusiness {
  constructor(private service: ArmSystemRequestService) {}

  create(data: User) {
    data.Id = Guid.NewGuid().ToString('D');
    if (data.Password) {
      data.Password = HowellSM4.encrypt(data.Password).toLocaleUpperCase();
    }
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    return this.service.security.user.create(data);
  }
  update(data: User) {
    if (data.Password) {
      data.Password = HowellSM4.encrypt(data.Password).toLocaleUpperCase();
    }
    data.UpdateTime = new Date();
    return this.service.security.user.update(data);
  }
  async group() {
    let groups = await this.service.security.user.group();
    groups.forEach((x) => {
      if (x.GroupId === 0) {
        x.GroupName = '新建分组';
      }
    });
    return groups;
  }
}
