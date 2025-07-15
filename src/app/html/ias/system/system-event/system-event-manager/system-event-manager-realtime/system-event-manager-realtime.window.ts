import { Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { PicturePolygonArgs } from '../../../../share/picture/picture-polygon/picture-polygon.model';

@Injectable()
export class SystemEventManagerRealtimeWindow {
  picture = new PictureWindow();
  task = new TaskWindow();
  video = new VideoWindow();
  confirm = new ConfirmWindow();
  edit = {
    name: new EditNameWindow(),
  };
  details = new DetailsWindow();
  process = new ProcessWindow();
}

class PictureWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
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
  };
}
class VideoWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.video.path,
  };
  data?: MobileEventRecord;
  title = '';
}
class TaskWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.middle,
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
class ProcessWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  data?: MobileEventRecord;
  title = 'AI分析处理';
}
class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  data?: MobileEventRecord;
  title = 'AI分析事件信息';
}
