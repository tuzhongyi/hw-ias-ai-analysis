import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { User } from '../../../../common/data-core/models/user/user.model';

export class ManagementUserInfoManagerWindow {
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
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
  }
  style = {
    width: '580px',
    height: '506px',
    paddingTop: 0,
  };
  data?: User;
}
