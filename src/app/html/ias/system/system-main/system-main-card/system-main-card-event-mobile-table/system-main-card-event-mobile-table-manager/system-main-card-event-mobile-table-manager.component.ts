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
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventMobileTableComponent } from '../system-main-card-event-mobile-table/system-main-card-event-mobile-table.component';

@Component({
  selector: 'ias-system-main-card-event-mobile-table-manager',
  imports: [
    CommonModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventMobileTableComponent,
  ],
  templateUrl: './system-main-card-event-mobile-table-manager.component.html',
  styleUrl: './system-main-card-event-mobile-table-manager.component.less',
})
export class SystemMainCardEventMobileTableManagerComponent
  implements OnChanges
{
  @Input() datas: MobileEventRecord[] = [];
  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output() position = new EventEmitter<MobileEventRecord>();

  constructor() {}

  records: MobileEventRecord[] = [];

  title = '今日实时事件';

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
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
    details: (item: MobileEventRecord) => {
      this.details.emit(item);
    },
    position: (item: MobileEventRecord) => {
      this.position.emit(item);
    },
  };
}
