import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { DepartmentMember } from '../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../common/data-core/models/arm/security/department.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleSecurityDepartmentWindow {
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
  member = new MemberWindow();
}

class ConfirmWindow extends WindowViewModel {
  message: string = '';
  data?: Department | DepartmentMember;
  clear() {
    this.message = '';
    this.data = undefined;
  }
}
class DetailsWindow extends WindowViewModel {
  get style() {
    if (this.data) {
      return {
        ...SizeTool.window.large,
      };
    }

    return {
      ...SizeTool.window.large,
      height: 'auto',
    };
  }
  data?: Department;
  title = '部门信息';
}
class MemberWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.simple,
  };
  data?: DepartmentMember;
  departmentId = '';
  title = '部门员工信息';
}
