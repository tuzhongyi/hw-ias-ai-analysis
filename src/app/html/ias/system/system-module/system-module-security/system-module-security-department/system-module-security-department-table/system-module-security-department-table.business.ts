import { Injectable } from '@angular/core';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import {
  GetDepartmentMembersParams,
  GetDepartmentsParams,
} from '../../../../../../../common/data-core/requests/services/system/security/system-security.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import {
  DepartmentModel,
  SystemModuleSecurityDepartmentTableFilter,
} from './system-module-security-department-table.model';

@Injectable()
export class SystemModuleSecurityDepartmentTableBusiness {
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

  async load() {
    let datas = await this.data.load();
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  private convert(source: Department) {
    let model = ObjectTool.assign(source, DepartmentModel);
    if (source.DivisionId) {
      model.DivisionName = this.data
        .division(source.DivisionId)
        .then((x) => x.Name);
    }
    if (source.GridCellId) {
      model.GridCellName = this.data
        .division(source.GridCellId)
        .then((x) => x.Name);
    }
    if (source.AssignmentRule) {
      model.EventTypeNames = source.AssignmentRule.EventTypes.map((x) =>
        this.language.event.EventType(x)
      );
      Promise.all(model.EventTypeNames).then((x) => {
        model.EventTypeTitle = x.join('\n');
      });
    }

    model.DepartmentTypeName = Language.DepartmentType(model.DepartmentType);

    model.MemberCount = this.data.member(source.Id);
    return model;
  }

  private data = {
    division: (id: string) => {
      return this.service.division.cache.get(id);
    },
    params: (
      index: number,
      size: number,
      filter: SystemModuleSecurityDepartmentTableFilter
    ) => {
      let params = new GetDepartmentsParams();
      params.PageIndex = index;
      params.PageSize = size;

      if (filter.name) {
        params.Name = filter.name;
      }

      params.Asc = filter.asc;
      params.Desc = filter.desc;
      return params;
    },
    load: () => {
      let params = new GetDepartmentsParams();
      return this.service.system.security.department.all(params);
    },
    member: async (id: string) => {
      let params = new GetDepartmentMembersParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      params.DepartmentIds = [id];
      let paged = await this.service.system.security.department.member.list(
        params
      );
      return paged.Page.TotalRecordCount;
    },
  };
}
