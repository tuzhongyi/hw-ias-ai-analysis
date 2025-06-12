import { Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../common/components/window-control/window.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../common/data-core/models/page-list.model';
import { HtmlTool } from '../../../../../common/tools/html-tool/html.tool';

@Injectable()
export class SystemEventManagerWindow {
  picture = new PictureWindow();
  task = new TaskWindow();
  video = new VideoWindow();
  confirm = new ConfirmWindow();
  edit = {
    name: new EditNameWindow(),
  };
  process = {
    sign: {
      discover: new ProcessSignDisconverWindow(),
      disappear: new ProcessSignDisappearWindow(),
    },
  };
  shop = new ShopWindow();
  info = new InfoWindow();
}

class PictureWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };

  title = '';
  page?: Page;
  url?: string;
  polygon: HowellPoint[] = [];

  clear() {
    this.title = '';

    this.url = undefined;
    this.polygon = [];
  }

  set(data?: MobileEventRecord): void;
  set(data?: ShopRegistration): void;
  set(data?: MobileEventRecord | ShopRegistration): void {
    this.clear();
    if (data instanceof MobileEventRecord) {
      this.from.record(data);
    } else if (data instanceof ShopRegistration) {
      this.from.shop(data);
    }
  }

  private from = {
    record: (data: MobileEventRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];

        this.title = resource.ResourceName;
        this.url = resource.ImageUrl;
        this.polygon = [];
        if (resource.Objects && resource.Objects.length > 0) {
          this.polygon = resource.Objects[0].Polygon;
        }
      }
    },
    shop: (data: ShopRegistration) => {
      this.title = data.Name;
      this.url = data.ImageUrl;
      this.polygon = [];
    },
  };
}
class VideoWindow extends WindowViewModel {
  style = {
    width: '74%',
    height: '74%',
  };
  data?: MobileEventRecord;
  title = '';
}
class TaskWindow extends WindowViewModel {
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

class ShopWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };
  data?: ShopRegistration;
  title = '添加注册商铺';
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.message = '';
    this.result = undefined;
  }
  message: string = '';
  result?: boolean;
}
class ProcessSignDisconverWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };
  data?: MobileEventRecord;
  title = '店招发现处置';
}
class EditNameWindow extends WindowViewModel {
  style = {
    width: '500px',
    height: 'auto',
  };
  data?: ShopRegistration;
  title = '修改注册商铺名称';
}
class ProcessSignDisappearWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };
  data?: MobileEventRecord;
  title = '店招消失处置';
}
class InfoWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };
  data?: MobileEventRecord;
  title = 'AI分析事件信息';
}
