import { UploadControlFileInfo } from '../../../../common/components/upload-control/upload-control.model';
import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { AnalysisTaskModel } from '../system-task-table/system-task-table.model';

export class SystemTaskManagerWindow {
  creation = new CreationWindow();
  confirm = new ConfirmWindow();
  result = new ResultWindow();
  details = new DetailsWindow();
}

class CreationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '40%',
    height: '70%',
    paddingTop: '10px',
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
  }
  style = {
    width: '85%',
    height: '90%',
    paddingTop: '10px',
  };
  data?: AnalysisTask;
}
class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '55%',
    height: '50%',
    paddingTop: '10px',
  };
  data?: AnalysisTask;
  files: UploadControlFileInfo[] = [];
}
