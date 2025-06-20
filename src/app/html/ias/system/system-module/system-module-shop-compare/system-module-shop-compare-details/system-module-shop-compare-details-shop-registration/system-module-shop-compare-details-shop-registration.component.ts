import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';

@Component({
  selector: 'ias-system-module-shop-compare-details-shop-registration',
  imports: [CommonModule, PictureComponent],
  templateUrl:
    './system-module-shop-compare-details-shop-registration.component.html',
  styleUrl:
    './system-module-shop-compare-details-shop-registration.component.less',
})
export class SystemModuleShopCompareDetailsShopRegistrationComponent {
  @Input() data?: ShopRegistration;
  @Output() picture = new EventEmitter<IShop>();
  Language = Language;

  onpicture() {
    this.picture.emit(this.data);
  }
}
