import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { SystemModuleRoadObjectStockManagerComponent } from '../system-module-road-object-stock-manager.component';

export class SystemModuleRoadObjectStockManagerConfirmWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectStockManagerComponent) {
    super();
  }
  message: string = '';
  data?: RoadObjectStock;

  clear() {
    this.message = '';
    this.data = undefined;
  }
  open(data: RoadObjectStock) {
    this.message = `是否删除部件 ${data.Name} ?`;
    this.data = data;
    this.show = true;
  }

  on = {
    ok: () => {
      if (this.data) {
        this.that.business
          .delete(this.data.Id!)
          .then(() => {
            this.that.toastr.success('操作成功');
            this.show = false;
            this.that.table.args.first = false;
            this.that.table.load.emit(this.that.table.args);
          })
          .catch(() => {
            this.that.toastr.error('操作失败');
          });
      }
    },
    close: () => {
      this.show = false;
    },
  };
}
