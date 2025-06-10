import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';

@Component({
  selector: 'ias-system-event-process-shop-name',
  imports: [],
  templateUrl: './system-event-process-shop-name.component.html',
  styleUrl: './system-event-process-shop-name.component.less',
})
export class SystemEventProcessShopNameComponent {
  @Input() data?: ShopRegistration;
  @Output() ok = new EventEmitter<ShopRegistration>();
  @Output() cancel = new EventEmitter<void>();
  on = {
    ok: () => {
      if (this.data) {
        this.ok.emit(this.data);
      }
    },
    cancel: () => {
      this.cancel.emit();
    },
  };
}
