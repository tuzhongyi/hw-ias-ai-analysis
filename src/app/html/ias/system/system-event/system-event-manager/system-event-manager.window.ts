import { WindowViewModel } from '../../../../../common/components/window-control/window.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { Page } from '../../../../../common/data-core/models/page-list.model';

export class SystemEventManagerWindow {
  picture = new PictureWindow();
  details = new DetailsWindow();
  video = new VideoWindow();
  map = new MapWindow();
  handle = new HandleWindow();
  creation = new CreationWindow();
  merge = new MergeWindow();
  relate = new RelateWindow();
  confirm = new ConfirmWindow();
}

class PictureWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '80%',
  };
  datas: string[] = [];
  index = 1;
  title = '';
  page?: Page;
}
class VideoWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '74%',
  };
  filename?: string;
}
class MapWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '74%',
  };
  title = '';
  data?: GisPoint;
}
class DetailsWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '80%',
  };
  data?: MobileEventRecord;
}
class HandleWindow extends WindowViewModel {
  style = {
    width: '50%',
    height: '80%',
  };
  data?: MobileEventRecord;
  page?: Page;
}
class CreationWindow extends WindowViewModel {
  clear() {
    this.name = '';
    this.sub = false;
  }
  style = {
    width: '500px',
    height: 'auto',
  };
  name = '';
  sub = false;
}
class MergeWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
    this.name = '';
    this.sub = false;
    this.registration = undefined;
  }
  style = {
    width: '500px',
    height: 'auto',
  };
  title = '合并商铺招牌';
  data?: MobileEventRecord;
  name = '';
  registration?: ShopRegistration;
  sub = false;
}
class RelateWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '90%',
    height: '80%',
  };
  data?: Shop;
  title = '关联注册商铺';
}

class ConfirmWindow extends WindowViewModel {
  message: string = '';
  result: string = '';
}
