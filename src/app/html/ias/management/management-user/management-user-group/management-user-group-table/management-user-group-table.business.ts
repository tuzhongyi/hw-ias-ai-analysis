import { Injectable } from '@angular/core';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { ManagementUserGroupTableItem } from './management-user-group-table.model';

@Injectable()
export class ManagementUserGroupTableBusiness {
  constructor(
    private service: ArmSystemRequestService,
    private division: ArmDivisionRequestService,
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

  private async data() {
    let datas = await this.service.security.user.group.array();
    // GroupId 0 是用户信息里「新建分组」的占位项，不是真实用户组
    return datas.filter((x) => x.GroupId > 0);
  }

  async convert(data: UserGroup) {
    let item = new ManagementUserGroupTableItem();
    item = Object.assign(item, data);
    if (item.DivisionIds && item.DivisionIds.length > 0) {
      let names: string[] = [];
      for (let i = 0; i < item.DivisionIds.length; i++) {
        try {
          let division = await this.division.cache.get(item.DivisionIds[i]);
          if (division) {
            names.push(division.Name);
          }
        } catch (error) {
          console.error(error);
        }
      }
      item.DivisionNames = names;
    }
    return item;
  }
}
