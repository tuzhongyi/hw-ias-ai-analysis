import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { DepartmentMember } from '../../../../../../common/data-core/models/arm/security/department-member.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleSecurityMemberWindow {
  details = new DetailsWindow();
  confirm = new ConfirmWindow();
}
class ConfirmWindow extends WindowViewModel {
  message: string = '';
  data?: DepartmentMember;
  clear() {
    this.message = '';
    this.data = undefined;
  }
}
class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.simple,
  };
  data?: DepartmentMember;
  title = '员工信息';
}
