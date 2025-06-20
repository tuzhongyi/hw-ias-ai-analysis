import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { SystemTaskShopRegistrationDetailsComponent } from '../system-task-shop-registration-details/system-task-shop-registration-details.component';
import { SystemTaskShopRegistrationTableComponent } from '../system-task-shop-registration-table/system-task-shop-registration-table.component';
import { SystemTaskShopRegistrationTableArgs } from '../system-task-shop-registration-table/system-task-shop-registration-table.model';
import { SystemTaskShopRegistrationManagerBusiness } from './system-task-shop-registration-manager.business';

@Component({
  selector: 'ias-system-task-shop-registration-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemTaskShopRegistrationTableComponent,
    SystemTaskShopRegistrationDetailsComponent,
  ],
  templateUrl: './system-task-shop-registration-manager.component.html',
  styleUrl: './system-task-shop-registration-manager.component.less',
  providers: [SystemTaskShopRegistrationManagerBusiness],
})
export class SystemTaskShopRegistrationManagerComponent implements OnInit {
  @Input() associated?: boolean;
  constructor(private business: SystemTaskShopRegistrationManagerBusiness) {}
  Language = Language;
  inited = false;
  table = {
    args: new SystemTaskShopRegistrationTableArgs(),
    load: new EventEmitter<SystemTaskShopRegistrationTableArgs>(),
    selected: undefined as ShopRegistration | undefined,
  };
  source = {
    road: [] as Road[],
  };

  ngOnInit(): void {
    this.table.args.associated = this.associated;
    this.init();
    this.inited = true;
  }

  init() {
    this.business.load().then((x) => {
      this.source.road = x;
    });
  }

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
