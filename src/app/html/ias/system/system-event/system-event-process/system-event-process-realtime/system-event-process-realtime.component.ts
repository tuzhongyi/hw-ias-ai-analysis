import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventProcessInfoComponent } from '../system-event-process-info/system-event-process-info.component';

@Component({
  selector: 'ias-system-event-process-realtime',
  imports: [CommonModule, SystemEventProcessInfoComponent],
  templateUrl: './system-event-process-realtime.component.html',
  styleUrl: './system-event-process-realtime.component.less',
})
export class SystemEventProcessRealtimeComponent {
  @Input() data?: MobileEventRecord;
  @Output() close = new EventEmitter<void>();

  on = {
    close: () => {
      this.close.emit();
    },
    ok: () => {},
  };
}
