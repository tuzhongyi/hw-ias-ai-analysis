import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';

@Component({
  selector: 'ias-system-main-card-event-road-object-table',
  imports: [CommonModule],
  templateUrl: './system-main-card-event-road-object-table.component.html',
  styleUrl: './system-main-card-event-road-object-table.component.less',
})
export class SystemMainCardEventRoadObjectTableComponent {
  @Input() datas: RoadObjectEventRecord[] = [];

  @Input() selected?: RoadObjectEventRecord;
  @Output() selectedChange = new EventEmitter<RoadObjectEventRecord>();

  @Output() details = new EventEmitter<RoadObjectEventRecord>();
  @Output() position = new EventEmitter<RoadObjectEventRecord>();

  widths = ['90px', 'auto', '60px', '56px'];
  Color = ColorTool;
  on = {
    select: (item: RoadObjectEventRecord) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    details: (item: RoadObjectEventRecord) => {
      this.details.emit(item);
    },
    position: (item: RoadObjectEventRecord) => {
      this.position.emit(item);
    },
  };
}
