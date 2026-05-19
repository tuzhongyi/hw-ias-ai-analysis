import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';

export interface ISystemModuleSecurityDepartmentTableArgs {
  name?: string;
}

export class SystemModuleSecurityDepartmentTableArgs
  implements ISystemModuleSecurityDepartmentTableArgs
{
  name?: string;
  first = false;
}
export class SystemModuleSecurityDepartmentTableFilter
  implements ISystemModuleSecurityDepartmentTableArgs
{
  name?: string;
  asc?: string;
  desc?: string;

  static from(
    args: SystemModuleSecurityDepartmentTableArgs
  ): SystemModuleSecurityDepartmentTableFilter {
    let filter = ObjectTool.assign(
      args,
      SystemModuleSecurityDepartmentTableFilter
    );
    return filter;
  }
}
export class DepartmentModel extends Department {
  DepartmentTypeName?: string;
  DivisionName?: Promise<string>;
  GridCellName?: Promise<string>;
  EventTypeNames: Promise<string>[] = [];
  EventTypeTitle: string = '';
  MemberCount!: Promise<number>;
}
