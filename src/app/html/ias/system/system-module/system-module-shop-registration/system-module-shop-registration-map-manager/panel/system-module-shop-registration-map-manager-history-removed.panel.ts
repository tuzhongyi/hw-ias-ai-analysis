import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  SystemModuleShopRegistrationMapManagerData,
  SystemModuleShopRegistrationMapManagerMap,
} from '../system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerWindow } from '../system-module-shop-registration-map-manager.window';
import { SystemModuleShopRegistrationMapManagerPanel } from './system-module-shop-registration-map-manager.panel';

export class SystemModuleShopRegistrationMapManagerHistoryRemovedPanel {
  title = '商铺删除记录';
  constructor(
    private map: SystemModuleShopRegistrationMapManagerMap,
    private data: SystemModuleShopRegistrationMapManagerData,

    private window: SystemModuleShopRegistrationMapManagerWindow,
    private panel: SystemModuleShopRegistrationMapManagerPanel
  ) {}

  revoke(item: ShopRegistration) {
    let index = this.data.removed.findIndex((x) => x.Id === item.Id);
    if (index >= 0) {
      this.data.removed.splice(index, 1);
      this.map.revoke.emit(item);
    }
  }
  close() {
    if (this.data.removed.length > 0) {
      this.confirm();
    } else {
      this.cancel();
    }
  }

  saved() {
    this.data.removed = [];
    this.map.clear();
    this.map.load.emit(this.map.args);
    this.map.removable = false;
  }

  private cancel() {
    this.map.clear();
    this.map.filter.emit(this.map.args);
    this.map.removable = false;
  }

  private confirm() {
    this.window.confirm.content = `已经移除${this.data.removed.length}个商铺，是否不保存已移除商铺？`;
    this.window.confirm.ok = () => {
      this.data.removed.forEach((x) => {
        this.map.revoke.emit(x);
      });
      this.data.removed = [];
      this.window.confirm.show = false;
      this.cancel();
    };
    this.window.confirm.show = true;
  }
}
