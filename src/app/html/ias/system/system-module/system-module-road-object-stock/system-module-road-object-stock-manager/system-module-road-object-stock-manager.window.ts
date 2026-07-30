import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { RoadObjectStock } from '../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleRoadObjectStockManagerWindow {
  confirm = new ConfirmWindow();
  details = new DetailsWindow();
}

class ConfirmWindow extends WindowViewModel {
  message: string = '';
  data?: RoadObjectStock;
  clear() {
    this.message = '';
    this.data = undefined;
  }
}
class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
    height: 'auto',
  };
  data?: RoadObjectStock;
  title = '道路部件待入库信息';
}
