import { EventEmitter } from '@angular/core';
import { UploadControlFileInfo } from '../../../../../../common/components/upload-control/upload-control.model';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { ShopStatisticStatus } from '../system-task-route/system-task-route-statistic/system-task-route-statistic.model';
import { AnalysisTaskModel } from '../system-task-table/system-task-table.model';
import { SystemTaskVideoArgs } from '../system-task-video/system-task-video.model';

export class SystemTaskManagerWindow {
  creation = new CreationWindow();
  confirm = new ConfirmWindow();
  result = new ResultWindow();
  details = new DetailsWindow();
  route = new RouteWindow();
  video = new VideoWindow();
  shop = {
    analysis: new ShopAnalysisWindow(),
    registration: new ShopRegistrationWindow(),
  };
  picture = new PictureWindow();
  file = new FileWindow();
}

class CreationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '40%',
    height: '70%',
    paddingTop: 0,
  };
  data?: AnalysisTask;
}
class ConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  data?: AnalysisTaskModel;

  get content() {
    return `是否删除任务 ${this.data?.Name} ？`;
  }
}
class ResultWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
    this.title = '';
  }
  style = {
    ...SizeTool.window.max,
  };
  data?: AnalysisTask;
  title = '';
}
class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '56%',
    height: '50%',
    paddingTop: 0,
  };
  data?: AnalysisTask;
  files: UploadControlFileInfo[] = [];
}
class RouteWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.max,
  };
  title = '';
  data?: AnalysisTask;
}
class VideoWindow extends WindowViewModel {
  clear() {
    this.args = undefined;
  }
  style = {
    ...SizeTool.window.video.path,
  };
  title = '';
  args?: SystemTaskVideoArgs;

  change() {
    if (this.args) {
      this.args = Object.assign({}, this.args);
    }
  }
}
class PictureWindow extends WindowViewModel {
  clear() {
    this.title = '';
    this.src = undefined;
    this.page = undefined;
    this.polygon = [];
  }
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  src?: string;
  polygon: HowellPoint[] = [];
  page?: Page;
}
class ShopAnalysisWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  data?: AnalysisTask;
  status?: ShopStatisticStatus;
  title = '商铺信息';
}
class ShopRegistrationWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  state?: boolean;
  data?: AnalysisTask;
  title = '注册商铺信息';
}
class FileWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
    this.selecteds = [];
  }
  style = {
    ...SizeTool.window.max,
  };
  data?: AnalysisTask;
  get title() {
    if (this.data) {
      return this.data.Name;
    }
    return '';
  }
  multiple = new EventEmitter<void>();
  selecteds: FileInfo[] = [];

  on = {
    multiple: () => {
      this.multiple.emit();
    },
    close: () => {
      this.clear();
      this.show = false;
    },
  };
}
