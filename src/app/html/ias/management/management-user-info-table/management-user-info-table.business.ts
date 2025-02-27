import { Injectable } from '@angular/core';
import { User } from '../../../../common/data-core/models/user/user.model';
import { Manager } from '../../../../common/data-core/requests/managers/manager';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';
import { ManagementUserInfoTableItem } from './management-user-info-table.model';

@Injectable()
export class ManagementUserInfoTableBusiness {
  constructor(
    private service: ArmSystemRequestService,
    private manager: Manager
  ) {}

  async load() {
    let datas = await this.data();
    let models = [];
    for (let i = 0; i < datas.length; i++) {
      let model = await this.convert(datas[i]);
      models.push(model);
    }

    return models;
  }

  private data() {
    return this.service.security.user.array();
  }

  async convert(data: User) {
    let item = new ManagementUserInfoTableItem();
    item = Object.assign(item, data);
    let capability = await this.manager.capability.security;
    if (capability.PriorityTypes && item.Priorities) {
      item.PriorityNames = item.Priorities.map((priority) => {
        let type = capability.PriorityTypes.find((x) => x.Value === priority);
        return type ? type.Name : priority;
      });
    }
    return item;
  }
}
