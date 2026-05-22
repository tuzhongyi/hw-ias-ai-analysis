import { Injectable } from '@angular/core';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { GetDepartmentMembersParams } from '../../../../../../../common/data-core/requests/services/system/security/system-security.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { SystemModuleSecurityMemberTableFilter } from './system-module-security-member-table.model.ts';

@Injectable()
export class SystemModuleSecurityMemberTableBusiness {
  constructor(
    system: ArmSystemRequestService,
    division: ArmDivisionRequestService,
    private language: LanguageTool
  ) {
    this.service = { system, division };
  }

  private service: {
    system: ArmSystemRequestService;
    division: ArmDivisionRequestService;
  };

  async load(
    index: number,
    size: number,
    filter: SystemModuleSecurityMemberTableFilter
  ) {
    let data = await this.data.load(index, size, filter);
    if (data.Page.RecordCount == 0 && data.Page.PageIndex > 1) {
      data = await this.data.load(index - 1, size, filter);
    }
    return data;
  }

  async test() {
    let result: DepartmentMember[] = [];
    for (let i = 0; i < 10; i++) {
      let item = new DepartmentMember();
      item.CreationTime = new Date();
      item.DepartmentIds = ['daddc90261ba4572919ccbe6e2ae40d3'];
      item.Id = (i + 1).toString();
      item.MobileNo = `13700000${item.Id.padStart(3, '0')}`;
      item.Name = `测试${item.Id.padStart(3, '0')}`;
      item.UpdateTime = new Date();
      result.push(item);
    }
    return result;
  }

  private data = {
    load: (
      index: number,
      size: number,
      filter: SystemModuleSecurityMemberTableFilter
    ) => {
      let params = new GetDepartmentMembersParams();
      params.PageIndex = index;
      params.PageSize = size;

      if (filter.name) {
        params.NameOrMobileNo = filter.name;
      }
      if (filter.department) {
        params.DepartmentIds = [filter.department.Id];
      }

      params.Asc = filter.asc;
      params.Desc = filter.desc;
      return this.service.system.security.department.member.list(params);
    },
  };
}
