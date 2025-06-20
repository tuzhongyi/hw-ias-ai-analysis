import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../../../common/components/paginator/paginator.component';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Page } from '../../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../../common/directives/table-sorter/table-soater.directive';
import { SystemModuleShopRegistrationTableBusiness } from '../../../system-module-shop-registration/system-module-shop-registration-table/business/system-module-shop-registration-table.business';
import { SystemModuleShopRegistrationTableConverter } from '../../../system-module-shop-registration/system-module-shop-registration-table/business/system-module-shop-registration-table.converter';
import { SystemModuleShopRegistrationTableComponent } from '../../../system-module-shop-registration/system-module-shop-registration-table/system-module-shop-registration-table.component';
import { SystemModuleShopRegistrationTableItem } from '../../../system-module-shop-registration/system-module-shop-registration-table/system-module-shop-registration-table.model';

@Component({
  selector: 'ias-system-module-shop-compare-relate-table',
  imports: [CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-shop-compare-relate-table.component.html',
  styleUrl: './system-module-shop-compare-relate-table.component.less',
  providers: [
    SystemModuleShopRegistrationTableBusiness,
    SystemModuleShopRegistrationTableConverter,
  ],
})
export class SystemModuleShopCompareRelateTableComponent extends SystemModuleShopRegistrationTableComponent {
  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();

  override widths = ['7%', '15%', '25%', '33%', '20%'];
  override page = Page.create(1, 8);

  override select = {
    on: (item?: SystemModuleShopRegistrationTableItem | undefined) => {
      if (!item) return;
      this.selected = item;
      this.selectedChange.emit(item);
    },
    all: () => {},
    clear: () => {
      this.selected = undefined;
      this.selectedChange.emit(undefined);
    },
  };
}
