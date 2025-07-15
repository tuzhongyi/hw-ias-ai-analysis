import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemTaskRouteMapPanelShopRegistrationTableComponent } from '../system-task-route-map-panel-shop-registration-table/system-task-route-map-panel-shop-registration-table.component';

@Component({
  selector: 'ias-system-task-route-map-panel-shop-registration-list',
  imports: [
    CommonModule,
    SystemTaskRouteMapPanelShopRegistrationTableComponent,
  ],
  templateUrl:
    './system-task-route-map-panel-shop-registration-list.component.html',
  styleUrl:
    './system-task-route-map-panel-shop-registration-list.component.less',
})
export class SystemTaskRouteMapPanelShopRegistrationListComponent {
  @Input() datas: ShopRegistration[] = [];
  @Output() details = new EventEmitter<IShop>();
  @Input() selected?: IShop;
  @Output() selectedChange = new EventEmitter<IShop>();
  @Output() itemhover = new EventEmitter<IShop>();
  @Output() itemblur = new EventEmitter<IShop>();
  @Output() position = new EventEmitter<IShop>();
  @Output() video = new EventEmitter<IShop>();
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
    video: (item: IShop) => {
      this.video.emit(item);
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
