import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleRoadObjectStockDetailsManagerWindow {
  course = new CourseWindow();

  style = {
    ...SizeTool.window.large,
    height: 'auto',
  };
  data?: RoadObjectStock;
  title = '道路部件待入库信息';
}

class CourseWindow extends WindowViewModel {
  style = {
    width: '600px',
    height: '600px',
  };
  title = '角度设置';
}
