import { Component, Input } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';

@Component({
  selector: 'ias-system-event-details-assgin',
  imports: [],
  templateUrl: './system-event-details-assgin.component.html',
  styleUrl: './system-event-details-assgin.component.less',
})
export class SystemEventDetailsAssginComponent {
  @Input() data?: MobileEventRecord;
}
