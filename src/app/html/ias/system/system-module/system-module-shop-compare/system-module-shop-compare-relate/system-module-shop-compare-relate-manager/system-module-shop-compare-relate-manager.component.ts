import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { SystemModuleShopRegistrationTableArgs } from '../../../system-module-shop-registration/system-module-shop-registration-table/system-module-shop-registration-table.model';
import { SystemModuleShopCompareRelateTableComponent } from '../system-module-shop-compare-relate-table/system-module-shop-compare-relate-table.component';

@Component({
  selector: 'ias-system-module-shop-compare-relate-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleShopCompareRelateTableComponent,
  ],
  templateUrl: './system-module-shop-compare-relate-manager.component.html',
  styleUrl: './system-module-shop-compare-relate-manager.component.less',
})
export class SystemModuleShopCompareRelateManagerComponent {
  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();

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
