import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventSampleTableComponent } from '../system-main-card-event-sample-table/system-main-card-event-sample-table.component';

@Component({
  selector: 'ias-system-main-card-event-sample-table-manager',
  imports: [
    CommonModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventSampleTableComponent,
  ],
  templateUrl: './system-main-card-event-sample-table-manager.component.html',
  styleUrl: './system-main-card-event-sample-table-manager.component.less',
})
export class SystemMainCardEventSampleTableManagerComponent
  implements OnChanges
{
  @Input() datas: GpsTaskSampleRecord[] = [];
  @Output() details = new EventEmitter<GpsTaskSampleRecord>();
  @Output() position = new EventEmitter<GpsTaskSampleRecord>();

  constructor() {}

  records: GpsTaskSampleRecord[] = [];

  title = '今日场景事件';

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.datas && this.datas.length > 0) {
          let records = [...this.datas];
          records.length = Math.min(records.length, 20);
          this.records = records;
        }
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }

  on = {
    details: (item: GpsTaskSampleRecord) => {
      this.details.emit(item);
    },
    position: (item: GpsTaskSampleRecord) => {
      this.position.emit(item);
    },
  };
}
