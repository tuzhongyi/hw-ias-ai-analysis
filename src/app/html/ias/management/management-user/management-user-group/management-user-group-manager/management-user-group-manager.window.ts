import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class ManagementUserGroupManagerWindow {
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
}

class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除选中用户组？`;
  }
  datas: UserGroup[] = [];
}

class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.middle,
  };
  data?: UserGroup;
  title = '用户组信息';
}
