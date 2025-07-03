import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Language } from '../../../../../../common/tools/language-tool/language';

@Component({
  selector: 'ias-system-event-process-handled',
  imports: [CommonModule],
  templateUrl: './system-event-process-handled.component.html',
  styleUrl: './system-event-process-handled.component.less',
})
export class SystemEventProcessHandledComponent {
  @Input() data?: MobileEventRecord;
  @Input() shop?: ShopRegistration;

  Language = Language;

  description() {
    if (this.data && this.data.Assignment) {
      switch (this.data.Assignment.AssociationType) {
        case 6:
          if (this.data.Assignment.AssociationDescription) {
            return this.data.Assignment.AssociationDescription;
          }
          break;
        default:
          break;
      }
      if (this.data.Assignment.HandleDescription) {
        return this.data.Assignment.HandleDescription;
      }
    }
    return '-';
  }
}
