import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';

@Component({
  selector: 'ias-system-module-shop-registration-information-business-info',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    WheelInputNumberDirective,
  ],
  templateUrl:
    './system-module-shop-registration-information-business-info.component.html',
  styleUrl:
    './system-module-shop-registration-information-business-info.component.less',
})
export class SystemModuleShopRegistrationInformationBusinessInfoComponent
  implements OnInit
{
  @Input() operable = true;
  @Input('data') _data?: ShopRegistration;
  @Output() close = new EventEmitter<void>();
  @Output() ok = new EventEmitter<ShopRegistration>();

  data = new ShopRegistration();

  ngOnInit(): void {
    if (this._data) {
      this.data = Object.assign(this.data, this._data);
    }
  }

  on = {
    ok: () => {
      this.ok.emit(this.data);
    },
    close: () => {
      this.close.emit();
    },
  };
}
