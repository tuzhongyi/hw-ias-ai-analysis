import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  SystemModuleShopRegistrationMapManagerData,
  SystemModuleShopRegistrationMapManagerMap,
} from '../system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerWindow } from '../system-module-shop-registration-map-manager.window';
import { SystemModuleShopRegistrationMapManagerPanel } from './system-module-shop-registration-map-manager.panel';

export class SystemModuleShopRegistrationMapManagerLocationPanel {
  show = false;

  constructor(
    private map: SystemModuleShopRegistrationMapManagerMap,
    private data: SystemModuleShopRegistrationMapManagerData,
    private window: SystemModuleShopRegistrationMapManagerWindow,
    private panel: SystemModuleShopRegistrationMapManagerPanel
  ) {}

  trigger() {
    if (this.data.changed.length > 0) {
      this.confirm();
    } else {
      this.open();
    }
  }
  private confirm() {
    this.window.confirm.content = `已经调整${this.data.changed.length}个商铺坐标，是否不保存已调整坐标？`;
    this.window.confirm.ok = () => {
      this.window.confirm.show = false;
      this.open();
    };
    this.window.confirm.show = true;
  }
  private open() {
    this.map.clean.emit();
    this.panel.search.show = false;
    this.panel.settings.show = false;
    this.panel.location.show = true;

    this.map.clean.emit();
  }
  ok(datas: ShopRegistration[]) {
    this.map.clear();
    this.map.args.ids = datas.map((x) => x.Id);
    this.map.filter.emit(this.map.args);
    this.data.changed = [...datas];
    this.panel.search.show = true;
    this.panel.location.show = false;
    this.panel.settings.show = true;
    this.map.draggable = true;
  }
  close() {
    this.map.filter.emit(this.map.args);
    this.panel.search.show = true;
    this.panel.settings.show = true;
    this.panel.location.show = false;
  }
}
