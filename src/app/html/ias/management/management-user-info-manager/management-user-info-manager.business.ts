import { Injectable } from '@angular/core';
import { User } from '../../../../common/data-core/models/user/user.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementUserInfoManagerBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async delete(datas: User[]) {
    let count = 0;
    for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      try {
        await this.service.security.user.delete(data.Id);
        count++;
      } catch (error) {
        console.error(error);
      }
    }

    return count;
  }
}
