import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemMapSearchShopRoadArgs } from '../../../../system-map/system-map-search-shop-road/system-map-search-shop-road.model';
import { SystemMainManagerShopArgs } from '../../../system-main-manager/business/system-main-manager.model';
import { SystemMainPanelShopRegistrationSearchComponent } from '../system-main-panel-shop-registration-search/system-main-panel-shop-registration-search.component';
import { SystemMainPanelShopRegistrationTableComponent } from '../system-main-panel-shop-registration-table/system-main-panel-shop-registration-table.component';

@Component({
  selector: 'ias-system-main-panel-shop-registration-table-manager',
  imports: [
    SystemMainPanelShopRegistrationSearchComponent,
    SystemMainPanelShopRegistrationTableComponent,
  ],
  templateUrl:
    './system-main-panel-shop-registration-table-manager.component.html',
  styleUrl:
    './system-main-panel-shop-registration-table-manager.component.less',
})
export class SystemMainPanelShopRegistrationTableManagerComponent {
  @Input() datas: ShopRegistration[] = [];
  @Output() details = new EventEmitter<IShop>();
  @Input() selected?: IShop;
  @Output() selectedChange = new EventEmitter<IShop>();
  @Output() itemhover = new EventEmitter<IShop>();
  @Output() itemblur = new EventEmitter<IShop>();
  @Output() position = new EventEmitter<IShop>();
  @Output() close = new EventEmitter<void>();
  @Output() filter = new EventEmitter<SystemMainManagerShopArgs>();

  on = {
    close: () => {
      this.close.emit();
    },
    position: (item: IShop) => {
      this.position.emit(item);
    },
    details: (item: IShop) => {
      this.details.emit(item);
    },
    search: (args: SystemMapSearchShopRoadArgs) => {
      this.filter.emit(args);
    },
    selected: {
      change: (item: IShop) => {
        this.selected = item;
        this.selectedChange.emit(item);
      },
    },
    item: {
      hover: (item: IShop) => {
        this.itemhover.emit(item);
      },
      blur: (item: IShop) => {
        this.itemblur.emit(item);
      },
    },
  };
}
