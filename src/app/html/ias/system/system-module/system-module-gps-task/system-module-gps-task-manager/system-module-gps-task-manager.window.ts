import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { AnalysisGpsTask } from '../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleGpsTaskPictureDrawingArgs } from '../system-module-gps-task-picture/system-module-gps-task-picture-drawing/system-module-gps-task-picture-drawing.model';

export class SystemModuleGpsTaskManagerWindow {
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
  picture = new PictureWindow();
  draw = new DrawWindow();
}
class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: AnalysisGpsTask;
  title = '定制场景任务信息';

  open(data?: AnalysisGpsTask) {
    this.data = data;
    this.show = true;
  }
}
class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除 ${this.count}个 选中的任务？`;
  }
  private count = 0;
  open(count = 0) {
    if (count > 0) {
      this.count = count;
      this.show = true;
    }
  }
}
class PictureWindow extends WindowViewModel {
  clear() {
    this.id = undefined;
    this.title = '';
  }
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  page?: Page;
  polygon: HowellPoint[] = [];
  private data?: AnalysisGpsTask;

  on = {
    open: (paged: Paged<AnalysisGpsTask>) => {
      this.data = paged.Data;
      this.on.change(paged.Page);
      this.show = true;
    },
    change: (page: Page) => {
      this.page = page;
      if (this.data && this.data.Images && this.data.Images.length > 0) {
        let index = page.PageIndex - 1;
        let image = this.data.Images[index];
        this.id = image.ImageUrl;
        this.title = `${this.data.Name}-${image.PositionNo}`;
        if (image.Labels && image.Labels.length > 0) {
          this.polygon = [...image.Labels[0].Polygon];
        } else {
          this.polygon = [];
        }
      }
    },
  };
}
class DrawWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  args = new SystemModuleGpsTaskPictureDrawingArgs();
  open(title: string, args: SystemModuleGpsTaskPictureDrawingArgs) {
    this.title = title;
    this.args = args;
    this.show = true;
  }
}
