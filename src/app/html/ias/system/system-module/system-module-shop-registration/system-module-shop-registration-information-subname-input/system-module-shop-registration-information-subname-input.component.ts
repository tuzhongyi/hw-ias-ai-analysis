import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ias-system-module-shop-registration-information-subname-input',
  imports: [CommonModule, FormsModule],
  templateUrl:
    './system-module-shop-registration-information-subname-input.component.html',
  styleUrl:
    './system-module-shop-registration-information-subname-input.component.less',
})
export class SystemModuleShopRegistrationInformationSubnameInputComponent {
  @Output() ok = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  value = '';

  onok() {
    this.ok.emit(this.value);
  }
  oncancel() {
    this.close.emit();
  }
}
