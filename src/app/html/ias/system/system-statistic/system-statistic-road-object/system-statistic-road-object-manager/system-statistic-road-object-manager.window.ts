import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { Page } from '../../../../../../common/data-core/models/interface/page-list.model';
import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { PicturePolygonArgs } from '../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemEventVideoArgs } from '../../../system-event/system-event-video/system-event-video.model';

export class SystemStatisticRoadObjectManagerWindow {
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

  set(data: RoadObjectEventRecord | EventResourceContent | RoadObject): void {
    this.clear();
    if (data instanceof RoadObjectEventRecord) {
      this.from.record(data);
    } else if (data instanceof EventResourceContent) {
      return this.from.resource(data);
    } else if (data instanceof RoadObject) {
      return this.from.object(data);
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
    object: (data: RoadObject) => {
      this.args = new PicturePolygonArgs();
      this.title = `${data.Name}${data.Address ? '-' : ''}${
        data.Address || ''
      }`;
      this.args.id = data.ImageUrl;
      this.args.polygon = [];
    },
  };
}
class VideoEventWindow extends WindowViewModel {
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
  open(data: RoadObjectEventRecord, name: string) {
    this.title = `${name}`;
    if (data.Resources && data.Resources.length > 0) {
      let resource = data.Resources[0];
      this.title = `${resource.ResourceName} ${name}`;
      // this.window.video.args.channel = resource.PositionNo;
    }
    this.data = data;
    this.show = true;
  }
}
class VideoFileWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '';

  resources: EventResourceContent[] = [];
  selected?: EventResourceContent;
  src = '';
  name = '';

  change() {
    if (this.selected) {
      this.title = `${this.selected.ResourceName} ${this.name}`;
      this.src = PathTool.record(this.selected.RecordUrl);
    }
  }
  open(data: RoadObjectEventRecord, name: string) {
    this.title = `${name}`;
    this.resources = data.Resources?.filter((x) => !!x.RecordUrl) ?? [];
    if (this.resources.length > 0) {
      this.selected = this.resources[0];
      this.change();
      this.show = true;
    }
  }
}
class VideoWindow {
  event = new VideoEventWindow();
  file = new VideoFileWindow();
  open(data: RoadObjectEventRecord, name: string) {
    let has = data.Resources?.some((x) => x.RecordUrl);
    if (has) {
      this.file.open(data, name);
    } else {
      this.event.open(data, name);
    }
  }
  close() {
    this.file.show = false;
    this.event.show = false;
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
