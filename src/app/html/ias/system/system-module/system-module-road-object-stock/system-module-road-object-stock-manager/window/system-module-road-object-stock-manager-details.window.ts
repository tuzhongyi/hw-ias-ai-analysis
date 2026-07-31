import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectStockManagerComponent } from '../system-module-road-object-stock-manager.component';

export class SystemModuleRoadObjectStockManagerDetailsWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectStockManagerComponent) {
    super();
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: RoadObjectStock;
  title = '道路部件待入库信息';

  open(data?: RoadObjectStock) {
    console.log(this.style);
    this.data = data;
    this.show = true;
  }

  on = {
    ok: () => {
      this.show = false;
      this.that.table.args.first = false;
      this.that.table.load.emit(this.that.table.args);
    },
    close: () => {
      this.show = false;
    },
  };
}
