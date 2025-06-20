import { UploadControlFileInfo } from '../../../../../common/components/upload-control/upload-control.model';
import { WindowViewModel } from '../../../../../common/components/window-control/window.model';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { HtmlTool } from '../../../../../common/tools/html-tool/html.tool';
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
    width: '85%',
    height: '90%',
    paddingTop: 0,
  };
  data?: AnalysisTask;
  title = '';
}
class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '55%',
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
    width: '99%',
    height: '99%',
  };
  title = '';
  data?: AnalysisTask;
}
class VideoWindow extends WindowViewModel {
  clear() {
    this.args = undefined;
  }
  style = {
    width: `${screen.availWidth * 0.85}px`,
    height: HtmlTool.screen.has.head.from.width(
      screen.availWidth * 0.85,
      16 / 9,
      -200
    ),
  };
  title = '';
  args?: SystemTaskVideoArgs;

  change() {
    if (this.args) {
      this.args = Object.assign({}, this.args);
    }
  }
}
class ShopAnalysisWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };
  data?: AnalysisTask;
  status?: ShopStatisticStatus;
  title = '商铺信息';
}
class ShopRegistrationWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };
  state?: boolean;
  title = '注册商铺信息';
}
