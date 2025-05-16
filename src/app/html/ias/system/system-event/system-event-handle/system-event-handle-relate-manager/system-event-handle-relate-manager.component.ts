import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { SystemModuleShopCompareRelateTableComponent } from '../../../system-module/system-module-shop-compare/system-module-shop-compare-relate/system-module-shop-compare-relate-table/system-module-shop-compare-relate-table.component';
import { SystemModuleShopRegistrationTableArgs } from '../../../system-module/system-module-shop-registration/system-module-shop-registration-table/system-module-shop-registration-table.model';

@Component({
  selector: 'ias-system-event-handle-relate-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleShopCompareRelateTableComponent,
  ],
  templateUrl: './system-event-handle-relate-manager.component.html',
  styleUrl: './system-event-handle-relate-manager.component.less',
})
export class SystemEventHandleRelateManagerComponent implements OnInit {
  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();
  @Input() location?: GisPoint;

  constructor() {}
  ngOnInit(): void {
    if (this.location) {
      this.table.args.point = {
        location: this.location,
        distance: 50,
      };
    }
  }
  table = {
    args: new SystemModuleShopRegistrationTableArgs(),
    load: new EventEmitter<SystemModuleShopRegistrationTableArgs>(),
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };

  onselect(item: ShopRegistration) {
    this.selected = item;
    this.selectedChange.emit(item);
  }
}
