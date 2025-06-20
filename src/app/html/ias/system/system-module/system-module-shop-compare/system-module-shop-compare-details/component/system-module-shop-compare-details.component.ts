import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopTaskCompareResult } from '../../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  Page,
  Paged,
} from '../../../../../../../common/data-core/models/page-list.model';
import { ListPageComponent } from '../../../../../share/list-page/list-page.component';
import { SystemModuleShopCompareDetailsShopRegistrationComponent } from '../system-module-shop-compare-details-shop-registration/system-module-shop-compare-details-shop-registration.component';
import { SystemModuleShopCompareDetailsShopComponent } from '../system-module-shop-compare-details-shop/system-module-shop-compare-details-shop.component';

@Component({
  selector: 'ias-system-module-shop-compare-details',
  imports: [
    CommonModule,
    ListPageComponent,
    SystemModuleShopCompareDetailsShopComponent,
    SystemModuleShopCompareDetailsShopRegistrationComponent,
  ],
  templateUrl: './system-module-shop-compare-details.component.html',
  styleUrl: './system-module-shop-compare-details.component.less',
})
export class SystemModuleShopCompareDetailsComponent {
  @Input() shop?: Shop;
  @Input() registration?: ShopRegistration;
  @Output() picture = new EventEmitter<Paged<ShopTaskCompareResult>>();
  @Input() page?: Page;
  @Output() get = new EventEmitter<number>();

  onpicture(data: IShop) {
    let result = new ShopTaskCompareResult();
    result.ObjectState = data instanceof Shop ? 1 : 2;
    result.Shop = this.shop;
    result.ShopRegistration = this.registration;
    let paged = new Paged<ShopTaskCompareResult>();
    paged.Data = result;
    paged.Page = this.page ?? Page.create(1, 1, 1);
    this.picture.emit(paged);
  }

  onpage(index: number) {
    this.get.emit(index);
  }
}
