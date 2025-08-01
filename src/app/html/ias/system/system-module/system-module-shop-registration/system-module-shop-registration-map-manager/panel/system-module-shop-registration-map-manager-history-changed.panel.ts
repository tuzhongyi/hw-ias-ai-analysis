import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  SystemModuleShopRegistrationMapManagerData,
  SystemModuleShopRegistrationMapManagerMap,
} from '../system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerWindow } from '../system-module-shop-registration-map-manager.window';

export class SystemModuleShopRegistrationMapManagerHistoryChangedPanel {
  constructor(
    private map: SystemModuleShopRegistrationMapManagerMap,
    private data: SystemModuleShopRegistrationMapManagerData,

    private window: SystemModuleShopRegistrationMapManagerWindow
  ) {}

  revoke(item: ShopRegistration) {
    let index = this.data.changed.findIndex((x) => x.Id === item.Id);
    if (index >= 0) {
      this.data.changed.splice(index, 1);
      this.map.revoke.emit(item);
    }
  }
  private confirm() {
    this.window.confirm.content = `已经调整${this.data.changed.length}个商铺坐标，是否不保存已调整坐标？`;
    this.window.confirm.ok = () => {
      this.data.changed.forEach((x) => {
        this.map.revoke.emit(x);
      });
      this.data.changed = [];
      this.window.confirm.show = false;
      this.cancel();
    };
    this.window.confirm.show = true;
  }
  private cancel() {
    this.map.clear();
    this.map.filter.emit(this.map.args);
    this.map.draggable = false;
  }
  close() {
    if (this.data.changed.length > 0) {
      this.confirm();
    } else {
      this.cancel();
    }
  }
  saved() {
    this.data.changed = [];
    this.map.clear();
    this.map.load.emit(this.map.args);
    this.map.draggable = false;
  }
}
