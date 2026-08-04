import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectStockManagerComponent } from '../system-module-road-object-stock-manager.component';

export class SystemModuleRoadObjectStockManagerTransformWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectStockManagerComponent) {
    super();
  }
  style = {
    ...SizeTool.window.large,
    height: 'auto',
  };
  datas: RoadObjectStock[] = [];
  title = '批量导入到部件';

  open(datas: RoadObjectStock[]) {
    this.datas = datas;
    this.show = true;
  }

  on = {
    ok: (datas: RoadObject[]) => {
      this.show = false;
      this.that.table.args.first = false;
      this.that.table.load.emit(this.that.table.args);
      this.that.ok.emit(datas);
    },
    close: () => {
      this.show = false;
    },
  };
}
