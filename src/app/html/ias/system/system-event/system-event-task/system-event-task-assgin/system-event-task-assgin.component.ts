import { Component, Input } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';

@Component({
  selector: 'ias-system-event-task-assgin',
  imports: [],
  templateUrl: './system-event-task-assgin.component.html',
  styleUrl: './system-event-task-assgin.component.less',
})
export class SystemEventTaskAssginComponent {
  @Input() data?: MobileEventRecord;
}
