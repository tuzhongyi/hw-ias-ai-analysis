import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { SystemModuleShopCompareRelateManagerComponent } from '../system-module-shop-compare-relate-manager/system-module-shop-compare-relate-manager.component';

@Component({
  selector: 'ias-system-module-shop-compare-relate',
  imports: [
    CommonModule,
    FormsModule,
    PictureComponent,
    SystemModuleShopCompareRelateManagerComponent,
  ],
  templateUrl: './system-module-shop-compare-relate.component.html',
  styleUrl: './system-module-shop-compare-relate.component.less',
})
export class SystemModuleShopCompareRelateComponent {
  @Input() data?: Shop;
  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<ShopRegistration>();

  constructor(private toastr: ToastrService) {}

  selected?: ShopRegistration;

  onok() {
    if (this.selected) {
      this.ok.emit(this.selected);
    } else {
      this.toastr.error('请选择关联的注册商户');
    }
  }
  oncancel() {
    this.cancel.emit();
  }
}
