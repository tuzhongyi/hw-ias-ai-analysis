import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';

@Component({
  selector: 'ias-system-main-card-event-realtime-table',
  imports: [CommonModule],
  templateUrl: './system-main-card-event-realtime-table.component.html',
  styleUrl: './system-main-card-event-realtime-table.component.less',
})
export class SystemMainCardEventRealtimeTableComponent {
  @Input() datas: MobileEventRecord[] = [];

  @Input() selected?: MobileEventRecord;
  @Output() selectedChange = new EventEmitter<MobileEventRecord>();

  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output() position = new EventEmitter<MobileEventRecord>();

  widths = ['136px', 'auto', '70px', '56px'];
  Color = ColorTool;
  on = {
    select: (item: MobileEventRecord) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    details: (item: MobileEventRecord) => {
      this.details.emit(item);
    },
    position: (item: MobileEventRecord) => {
      this.position.emit(item);
    },
  };
}
