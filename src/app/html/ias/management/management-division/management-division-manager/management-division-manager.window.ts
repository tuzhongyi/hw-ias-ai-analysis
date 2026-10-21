import { WindowViewModel } from '../../../../../common/components/window-control/window.model';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';

export class ManagementDivisionManagerWindow {
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
}

class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除选中的 ${this.data.length} 个区划？`;
  }
  data: Division[] = [];
}

class DetailsWindow extends WindowViewModel {
  get title() {
    return this.data?.Id ? '区划详情' : '新增区划';
  }
  style = {
    ...SizeTool.window.simple,
    height: '410px',
  };
  data?: Division;
}
