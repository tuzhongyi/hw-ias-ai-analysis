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
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventRoadObjectTableComponent } from '../system-main-card-event-road-object-table/system-main-card-event-road-object-table.component';

@Component({
  selector: 'ias-system-main-card-event-road-object-table-manager',
  imports: [
    CommonModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventRoadObjectTableComponent,
  ],
  templateUrl:
    './system-main-card-event-road-object-table-manager.component.html',
  styleUrl: './system-main-card-event-road-object-table-manager.component.less',
})
export class SystemMainCardEventRoadObjectTableManagerComponent
  implements OnChanges
{
  @Input() datas: RoadObjectEventRecord[] = [];
  @Output() details = new EventEmitter<RoadObjectEventRecord>();
  @Output() position = new EventEmitter<RoadObjectEventRecord>();

  constructor() {}

  records: RoadObjectEventRecord[] = [];

  title = '今日部件事件';

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
    details: (item: RoadObjectEventRecord) => {
      this.details.emit(item);
    },
    position: (item: RoadObjectEventRecord) => {
      this.position.emit(item);
    },
  };
}
