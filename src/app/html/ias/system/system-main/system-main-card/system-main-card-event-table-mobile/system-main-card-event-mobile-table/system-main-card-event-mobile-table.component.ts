import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';

@Component({
  selector: 'ias-system-main-card-event-mobile-table',
  imports: [CommonModule],
  templateUrl: './system-main-card-event-mobile-table.component.html',
  styleUrl: './system-main-card-event-mobile-table.component.less',
})
export class SystemMainCardEventMobileTableComponent {
  @Input() datas: MobileEventRecord[] = [];

  @Input() selected?: MobileEventRecord;
  @Output() selectedChange = new EventEmitter<MobileEventRecord>();

  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output() position = new EventEmitter<MobileEventRecord>();

  widths = ['90px', 'auto', '120px', '56px'];
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
      if (item.Location) {
        this.position.emit(item);
      }
    },
  };
}
