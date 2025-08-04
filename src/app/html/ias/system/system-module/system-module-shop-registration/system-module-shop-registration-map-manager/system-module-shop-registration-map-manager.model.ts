import { EventEmitter } from '@angular/core';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemModuleShopRegistrationMapArgs } from '../system-module-shop-registration-map/system-module-shop-registration-map.model';
import { SystemModuleShopRegistrationMapManagerWindow } from './system-module-shop-registration-map-manager.window';

export class SystemModuleShopRegistrationMapManagerData {
  source: ShopRegistration[] = [];
  changed: ShopRegistration[] = [];
  removed: ShopRegistration[] = [];
  selected?: ShopRegistration;
}
export class SystemModuleShopRegistrationMapManagerMap {
  args = new SystemModuleShopRegistrationMapArgs();
  rectified = false;
  load = new EventEmitter<SystemModuleShopRegistrationMapArgs>();
  filter = new EventEmitter<SystemModuleShopRegistrationMapArgs>();

  focus = new EventEmitter<ShopRegistration>();
  over = new EventEmitter<ShopRegistration>();
  out = new EventEmitter<ShopRegistration>();
  revoke = new EventEmitter<ShopRegistration>();
  clean = new EventEmitter<void>();
  draggable = false;
  removable = false;
  clear() {
    this.args.name = undefined;
    this.args.road.on = undefined;
    this.args.road.ori = undefined;
    this.args.side = undefined;
    this.args.ids = undefined;
  }
}
export interface SystemModuleShopRegistrationMapManagerPanelArgs {
  data: SystemModuleShopRegistrationMapManagerData;
  map: SystemModuleShopRegistrationMapManagerMap;
  window: SystemModuleShopRegistrationMapManagerWindow;
}
