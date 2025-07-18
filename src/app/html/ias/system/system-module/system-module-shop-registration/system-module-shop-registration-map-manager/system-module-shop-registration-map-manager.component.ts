import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemMapSearchShopRoadComponent } from '../../../system-map/system-map-search-shop-road/system-map-search-shop-road.component';
import { SystemMapSearchShopRoadArgs } from '../../../system-map/system-map-search-shop-road/system-map-search-shop-road.model';
import { SystemModuleShopRegistrationMapPanelShopListComponent } from '../system-module-shop-registration-map-panel/system-module-shop-registration-map-panel-shop-list/system-module-shop-registration-map-panel-shop-list.component';
import { SystemModuleShopRegistrationMapComponent } from '../system-module-shop-registration-map/system-module-shop-registration-map.component';
import { SystemModuleShopRegistrationMapArgs } from '../system-module-shop-registration-map/system-module-shop-registration-map.model';
import { SystemModuleShopRegistrationMapManagerPanel } from './panel/system-module-shop-registration-map-manager.panel';
import { SystemModuleShopRegistrationMapManagerWindow } from './system-module-shop-registration-map-manager.window';

@Component({
  selector: 'ias-system-module-shop-registration-map-manager',
  imports: [
    WindowComponent,
    CommonModule,
    SystemModuleShopRegistrationMapComponent,
    SystemModuleShopRegistrationMapPanelShopListComponent,
    SystemMapSearchShopRoadComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './system-module-shop-registration-map-manager.component.html',
  styleUrl: './system-module-shop-registration-map-manager.component.less',
})
export class SystemModuleShopRegistrationMapManagerComponent extends WindowComponent {
  window = new SystemModuleShopRegistrationMapManagerWindow();
  panel = new SystemModuleShopRegistrationMapManagerPanel();
  map = {
    args: new SystemModuleShopRegistrationMapArgs(),
    rectified: false,
    load: new EventEmitter<SystemModuleShopRegistrationMapArgs>(),
    focus: new EventEmitter<ShopRegistration>(),
    over: new EventEmitter<ShopRegistration>(),
    out: new EventEmitter<ShopRegistration>(),
    revoke: new EventEmitter<ShopRegistration>(),
  };

  data = {
    changed: [] as ShopRegistration[],
    source: [] as ShopRegistration[],
  };

  on = {
    map: {
      search: (args: SystemMapSearchShopRoadArgs) => {
        this.map.args.name = args.name;
        this.map.args.road = args.road;
        this.map.load.emit(this.map.args);
      },
      revoke: () => {
        let datas = [...this.data.changed];
        let data = datas.pop();
        if (data) {
          this.map.revoke.emit(data);
          this.data.changed = datas;
        }
      },
      loaded: (datas: ShopRegistration[]) => {
        this.data.source = datas;
        this.panel.list.show = true;
      },
    },
    table: {
      position: (data: ShopRegistration) => {
        this.map.focus.emit(data);
      },
      details: (data: ShopRegistration) => {},
      select: (data: ShopRegistration) => {},
      video: (data: ShopRegistration) => {},
      item: {
        over: (data: ShopRegistration) => {
          this.map.over.emit(data);
        },
        out: (data: ShopRegistration) => {
          this.map.out.emit(data);
        },
      },
    },
    close: () => {
      if (this.data.changed.length > 0) {
        this.window.confirm.content = `已经修改${this.data.changed.length}个商铺信息，是否不保存直接关闭窗口？`;
        this.window.confirm.ok = () => {
          this.close.emit();
        };
        this.window.confirm.show = true;
      } else {
        this.close.emit();
      }
    },
  };

  confirm = {
    ok: () => {
      if (this.window.confirm.ok) {
        this.window.confirm.ok();
      }
    },
  };
}
