import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { User } from '../../../../../../common/data-core/models/user/user.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class ManagementUserInfoManagerWindow {
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
  group = new GroupWindow();
}

class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除选中用户？`;
  }
  datas: User[] = [];
}

class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
    this.group = undefined;
  }
  style = {
    width: '580px',
    height: '506px',
    paddingTop: 0,
  };
  data?: User;
  /** 新建成功的分组，传给详情用于刷新并选中 */
  group?: UserGroup;
  title = '用户信息';
}

class GroupWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.middle,
  };
  /** 现有分组中 GroupId 最大的一行，新建时用于取下一个编号 */
  last?: UserGroup;
  title = '用户组信息';
}
