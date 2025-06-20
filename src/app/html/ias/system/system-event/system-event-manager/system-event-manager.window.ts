import { Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../common/components/window-control/window.model';
import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Page } from '../../../../../common/data-core/models/page-list.model';
import { HtmlTool } from '../../../../../common/tools/html-tool/html.tool';
import { PicturePolygonArgs } from '../../../share/picture/picture-polygon/picture-polygon.model';

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
  args?: PicturePolygonArgs;

  clear() {
    this.title = '';
    this.args = undefined;
  }

  set(data: MobileEventRecord | ShopRegistration | ShopSign): void {
    this.clear();
    if (data instanceof MobileEventRecord) {
      this.from.record(data);
    } else if (data instanceof ShopRegistration) {
      this.from.shop(data);
    } else if (data instanceof ShopSign) {
      this.from.sign(data);
    }
  }

  private from = {
    record: (data: MobileEventRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];

        this.args = new PicturePolygonArgs();
        this.title = resource.ResourceName;
        this.args.id = resource.ImageUrl;
        this.args.polygon = [];
        if (resource.Objects && resource.Objects.length > 0) {
          this.args.polygon = resource.Objects[0].Polygon;
        }
      }
    },
    shop: (data: ShopRegistration) => {
      this.title = data.Name;
      this.args = new PicturePolygonArgs();
      this.args.id = data.ImageUrl;
      this.args.polygon = [];
    },
    sign: (data: ShopSign) => {
      this.title = data.Text ?? '';
      this.args = new PicturePolygonArgs();
      this.args.id = data.ImageUrl;
      this.args.polygon = data.Polygon ?? [];
    },
  };
}
class VideoWindow extends WindowViewModel {
  style = {
    width: `${screen.availWidth * 0.85}px`,
    height: HtmlTool.screen.has.head.from.width(
      screen.availWidth * 0.85,
      16 / 9,
      -200
    ),
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
