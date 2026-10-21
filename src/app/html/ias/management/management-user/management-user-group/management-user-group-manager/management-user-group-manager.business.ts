import { Injectable } from '@angular/core';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementUserGroupManagerBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async delete(datas: UserGroup[]) {
    let count = 0;
    for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      try {
        await this.service.security.user.group.delete(data.GroupId);
        count++;
      } catch (error) {
        console.error(error);
      }
    }

    return count;
  }
}
