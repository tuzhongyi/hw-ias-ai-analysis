import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemMapPanelDetailsShopRegistrationComponent } from '../../../system-map/system-map-panel-details-shop-registration/system-map-panel-details-shop-registration.component';
import { SystemMapSearchShopRoadComponent } from '../../../system-map/system-map-search-shop-road/system-map-search-shop-road.component';
import { SystemMapSearchShopRoadArgs } from '../../../system-map/system-map-search-shop-road/system-map-search-shop-road.model';
import { SystemModuleShopRegistrationMapPanelFilterComponent } from '../system-module-shop-registration-map-panel-filter/system-module-shop-registration-map-panel-filter.component';
import { SystemModuleShopRegistrationMapPanelShopListComponent } from '../system-module-shop-registration-map-panel/system-module-shop-registration-map-panel-shop-list/system-module-shop-registration-map-panel-shop-list.component';
import { SystemModuleShopRegistrationMapComponent } from '../system-module-shop-registration-map/system-module-shop-registration-map.component';
import { SystemModuleShopRegistrationMapArgs } from '../system-module-shop-registration-map/system-module-shop-registration-map.model';
import { SystemModuleShopRegistrationMapManagerBusiness } from './business/system-module-shop-registration-map-manager.business';
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
    SystemModuleShopRegistrationMapPanelFilterComponent,
    SystemMapPanelDetailsShopRegistrationComponent,
  ],
  templateUrl: './system-module-shop-registration-map-manager.component.html',
  styleUrl: './system-module-shop-registration-map-manager.component.less',
  providers: [SystemModuleShopRegistrationMapManagerBusiness],
})
export class SystemModuleShopRegistrationMapManagerComponent extends WindowComponent {
  @Output() picture = new EventEmitter<ShopRegistration>();
  constructor(
    private business: SystemModuleShopRegistrationMapManagerBusiness,
    private toastr: ToastrService
  ) {
    super();
  }
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
    selected: undefined as ShopRegistration | undefined,
  };

  on = {
    map: {
      search: (args: SystemMapSearchShopRoadArgs) => {
        this.map.args.name = args.name;
        this.map.args.road = args.road;
        this.map.args.reload = false;
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
      selected: (data: ShopRegistration) => {
        this.on.table.details(data);
      },
    },
    table: {
      position: (data: ShopRegistration) => {
        this.map.focus.emit(data);
      },
      details: (data: ShopRegistration) => {
        this.data.selected = data;
        this.panel.details.show = true;
      },
      select: (data: ShopRegistration) => {
        this.data.selected = data;
      },
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
    picture: (data: ShopRegistration) => {
      this.picture.emit(data);
    },
    filter: (args: SystemModuleShopRegistrationMapArgs) => {
      this.map.args.name = args.name;
      this.map.args.road = args.road;
      this.map.args.side = args.side;
      this.map.args.reload = false;
      this.map.load.emit(this.map.args);
      this.panel.filter.show = false;
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
    save: () => {
      if (this.data.changed.length > 0) {
        this.business.save(this.data.changed).then(() => {
          this.toastr.success(
            `已成功保存${this.data.changed.length}个商铺信息`
          );
          this.data.changed = [];
          this.map.args.reload = true;
          this.map.load.emit(this.map.args);
        });
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
