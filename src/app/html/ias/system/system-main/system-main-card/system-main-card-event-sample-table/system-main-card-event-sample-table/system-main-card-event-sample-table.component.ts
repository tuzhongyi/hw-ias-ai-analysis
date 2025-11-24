import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';

@Component({
  selector: 'ias-system-main-card-event-sample-table',
  imports: [CommonModule],
  templateUrl: './system-main-card-event-sample-table.component.html',
  styleUrl: './system-main-card-event-sample-table.component.less',
})
export class SystemMainCardEventSampleTableComponent {
  @Input() datas: GpsTaskSampleRecord[] = [];

  @Input() selected?: GpsTaskSampleRecord;
  @Output() selectedChange = new EventEmitter<GpsTaskSampleRecord>();

  @Output() details = new EventEmitter<GpsTaskSampleRecord>();
  @Output() position = new EventEmitter<GpsTaskSampleRecord>();

  widths = ['120px', 'auto', '90px', '56px'];
  Color = ColorTool;
  on = {
    select: (item: GpsTaskSampleRecord) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    details: (item: GpsTaskSampleRecord) => {
      this.details.emit(item);
    },
    position: (item: GpsTaskSampleRecord) => {
      this.position.emit(item);
    },
  };
}
