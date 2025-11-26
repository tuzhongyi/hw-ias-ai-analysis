import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemMapPanelDetailsShopRegistrationComponent } from '../../../system-map/system-map-panel-details-shop-registration/system-map-panel-details-shop-registration.component';
import { SystemMapSearchShopRoadComponent } from '../../../system-map/system-map-search-shop-road/system-map-search-shop-road.component';
import { SystemMapSearchShopRoadArgs } from '../../../system-map/system-map-search-shop-road/system-map-search-shop-road.model';
import { SystemModuleShopRegistrationMapPanelFilterComponent } from '../system-module-shop-registration-map-panel/system-module-shop-registration-map-panel-filter/system-module-shop-registration-map-panel-filter.component';
import { SystemModuleShopRegistrationMapPanelHistoryListComponent } from '../system-module-shop-registration-map-panel/system-module-shop-registration-map-panel-history-list/system-module-shop-registration-map-panel-history-list.component';
import { SystemModuleShopRegistrationMapPanelLocationComponent } from '../system-module-shop-registration-map-panel/system-module-shop-registration-map-panel-location/system-module-shop-registration-map-panel-location.component';
import { SystemModuleShopRegistrationMapPanelSettingsComponent } from '../system-module-shop-registration-map-panel/system-module-shop-registration-map-panel-settings/system-module-shop-registration-map-panel-settings.component';
import { SystemModuleShopRegistrationMapPanelShopListComponent } from '../system-module-shop-registration-map-panel/system-module-shop-registration-map-panel-shop-list/system-module-shop-registration-map-panel-shop-list.component';
import { SystemModuleShopRegistrationMapComponent } from '../system-module-shop-registration-map/system-module-shop-registration-map.component';
import { SystemModuleShopRegistrationMapArgs } from '../system-module-shop-registration-map/system-module-shop-registration-map.model';
import { SystemModuleShopRegistrationMapManagerPanel } from './panel/system-module-shop-registration-map-manager.panel';
import {
  SystemModuleShopRegistrationMapManagerData,
  SystemModuleShopRegistrationMapManagerMap,
} from './system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerWindow } from './system-module-shop-registration-map-manager.window';

@Component({
  selector: 'ias-system-module-shop-registration-map-manager',
  imports: [
    WindowComponent,
    CommonModule,
    SystemModuleShopRegistrationMapComponent,
    SystemMapSearchShopRoadComponent,
    WindowConfirmComponent,
    SystemMapPanelDetailsShopRegistrationComponent,
    SystemModuleShopRegistrationMapPanelShopListComponent,
    SystemModuleShopRegistrationMapPanelFilterComponent,
    SystemModuleShopRegistrationMapPanelSettingsComponent,
    SystemModuleShopRegistrationMapPanelLocationComponent,
    SystemModuleShopRegistrationMapPanelHistoryListComponent,
  ],
  templateUrl: './system-module-shop-registration-map-manager.component.html',
  styleUrl: './system-module-shop-registration-map-manager.component.less',
  providers: [],
})
export class SystemModuleShopRegistrationMapManagerComponent extends WindowComponent {
  @Output() picture = new EventEmitter<ShopRegistration>();
  @Output() information = new EventEmitter<ShopRegistration>();
  constructor(private toastr: ToastrService) {
    super();
  }
  window = new SystemModuleShopRegistrationMapManagerWindow();

  map = new SystemModuleShopRegistrationMapManagerMap();
  data = new SystemModuleShopRegistrationMapManagerData();
  panel = new SystemModuleShopRegistrationMapManagerPanel({
    map: this.map,
    data: this.data,
    window: this.window,
  });

  on = {
    map: {
      search: (args: SystemMapSearchShopRoadArgs) => {
        this.map.args.name = args.name;
        this.map.args.road = args.road;
        this.map.filter.emit(this.map.args);
      },
      loaded: (datas: ShopRegistration[]) => {
        this.data.source = datas;
        this.panel.list.show = datas.length > 0;
        this.panel.details.show = false;
      },
      selected: (data: ShopRegistration) => {
        this.data.selected = data;
        this.panel.list.details(data);
      },
      draggable: (enabled: boolean) => {
        if (enabled) {
          this.map.removable = false;
        } else {
          this.panel.history.location.close();
        }
      },
    },
    picture: (data: ShopRegistration) => {
      this.picture.emit(data);
    },
    information: (data: ShopRegistration) => {
      this.information.emit(data);
    },
    filter: (args: SystemModuleShopRegistrationMapArgs) => {
      this.map.args.name = args.name;
      this.map.args.road = args.road;
      this.map.args.side = args.side;
      this.map.filter.emit(this.map.args);
      this.panel.filter.show = false;
    },

    close: () => {
      if (this.data.changed.length > 0) {
        this.window.confirm.content = `已经调整${this.data.changed.length}个商铺坐标，是否不保存直接关闭窗口？`;
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
