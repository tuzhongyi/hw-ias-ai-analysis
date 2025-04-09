import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopRegistration } from '../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { Language } from '../../../../common/tools/language';
import { PictureComponent } from '../../share/picture/picture.component';

@Component({
  selector: 'ias-system-map-panel-details-shop-registration',
  imports: [CommonModule, PictureComponent],
  templateUrl: './system-map-panel-details-shop-registration.component.html',
  styleUrl: './system-map-panel-details-shop-registration.component.less',
})
export class SystemMapPanelDetailsShopRegistrationComponent {
  @Input('data') data?: ShopRegistration;
  @Output() close = new EventEmitter<void>();
  @Output() picture = new EventEmitter<ShopRegistration>();

  constructor() {}

  Language = Language;

  onclose() {
    this.close.emit();
  }

  onpicture() {
    if (this.data) {
      this.picture.emit(this.data);
    }
  }
}
