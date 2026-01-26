import { Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { PicturePolygonArgs } from '../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemEventVideoArgs } from '../../system-event-video/system-event-video.model';

@Injectable()
export class SystemEventManagerRealtimeWindow {
  picture = new PictureWindow();
  task = new TaskWindow();
  video = new VideoWindow();
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
  process = new ProcessWindow();

  get opened() {
    return this.task.show || this.details.show || this.process.show;
  }
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

  set(data: RoadObjectEventRecord | EventResourceContent): void {
    this.clear();
    if (data instanceof RoadObjectEventRecord) {
      this.from.record(data);
    } else if (data instanceof EventResourceContent) {
      return this.from.resource(data);
    }
  }

  private from = {
    record: (data: RoadObjectEventRecord) => {
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
  data?: RoadObjectEventRecord;
  title = '';
  args: SystemEventVideoArgs = {
    duration: 5,
  };

  change() {
    if (this.args) {
      this.args = Object.assign({}, this.args);
    }
  }
}
class TaskWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.middle,
  };
  data?: RoadObjectEventRecord;
}
class ConfirmWindow extends WindowViewModel {
  clear() {
    this.message = '';
    this.result = undefined;
  }
  message: string = '';
  result?: boolean;
}
class ProcessWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  data?: RoadObjectEventRecord;
  title = 'AI分析处理';
}
class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  data?: RoadObjectEventRecord;
  title = 'AI分析事件信息';
}
