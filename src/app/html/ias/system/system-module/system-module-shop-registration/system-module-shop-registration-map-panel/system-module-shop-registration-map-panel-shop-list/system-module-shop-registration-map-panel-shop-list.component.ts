import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemModuleShopRegistrationMapPanelShopTableComponent } from '../system-module-shop-registration-map-panel-shop-table/system-module-shop-registration-map-panel-shop-table.component';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-shop-list',
  imports: [
    CommonModule,
    SystemModuleShopRegistrationMapPanelShopTableComponent,
  ],
  templateUrl:
    './system-module-shop-registration-map-panel-shop-list.component.html',
  styleUrl:
    './system-module-shop-registration-map-panel-shop-list.component.less',
})
export class SystemModuleShopRegistrationMapPanelShopListComponent {
  @Input() datas: ShopRegistration[] = [];
  @Output() details = new EventEmitter<IShop>();
  @Input() selected?: IShop;
  @Output() selectedChange = new EventEmitter<IShop>();
  @Output() itemhover = new EventEmitter<IShop>();
  @Output() itemblur = new EventEmitter<IShop>();
  @Output() position = new EventEmitter<IShop>();
  @Output() edit = new EventEmitter<IShop>();
  @Output() close = new EventEmitter<void>();

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
    edit: (item: IShop) => {
      this.edit.emit(item);
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
