import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleShopRegistrationManagerWindow {
  information = new InformationWindow();
  picture = new PictureWindow();
  confirm = new ConfirmWindow();
  map = new MapWindow();
  download = new FileDownloadWindow();
}
class InformationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: ShopRegistration;
  title = '注册商铺详细信息';
}
class PictureWindow extends WindowViewModel {
  clear() {
    this.id = undefined;
    this.title = '';
  }
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  page?: Page;
}
class MapWindow extends WindowViewModel {
  clear() {}
  style = {
    ...SizeTool.window.max,
  };
  title = '注册商铺坐标设置';
}
class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除选中的注册商铺？`;
  }
}
class FileDownloadWindow extends WindowViewModel {
  style = {
    width: '400px',
    height: 'auto',
  };
  title = '文件下载';
  roadId?: string;
}
