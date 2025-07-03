import { Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool';
import { PicturePolygonArgs } from '../../../../share/picture/picture-polygon/picture-polygon.model';

@Injectable()
export class SystemEventManagerAnalysisWindow {
  picture = new PictureWindow();
  task = new TaskWindow();
  video = new VideoWindow();
  confirm = new ConfirmWindow();
  edit = {
    name: new EditNameWindow(),
  };
  details = new DetailsWindow();
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

  set(
    data: MobileEventRecord | ShopRegistration | ShopSign | EventResourceContent
  ): void {
    this.clear();
    if (data instanceof MobileEventRecord) {
      this.from.record(data);
    } else if (data instanceof ShopRegistration) {
      this.from.shop(data);
    } else if (data instanceof ShopSign) {
      this.from.sign(data);
    } else if (data instanceof EventResourceContent) {
      return this.from.resource(data);
    }
  }

  private from = {
    record: (data: MobileEventRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        return this.from.resource(resource);
      }
    },
    resource: (data: EventResourceContent) => {
      this.args = new PicturePolygonArgs();
      this.title = data.ResourceName;
      this.args.id = data.ImageUrl;
      this.args.polygon = [];
      if (data.Objects && data.Objects.length > 0) {
        this.args.polygon = data.Objects[0].Polygon;
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
class ConfirmWindow extends WindowViewModel {
  clear() {
    this.message = '';
    this.result = undefined;
  }
  message: string = '';
  result?: boolean;
}
class EditNameWindow extends WindowViewModel {
  style = {
    width: '500px',
    height: 'auto',
  };
  data?: ShopRegistration;
  title = '修改注册商铺名称';
}
class DetailsWindow extends WindowViewModel {
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
