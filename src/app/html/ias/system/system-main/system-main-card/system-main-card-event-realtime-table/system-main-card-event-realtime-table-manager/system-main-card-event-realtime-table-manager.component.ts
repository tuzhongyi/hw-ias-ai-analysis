import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventRealtimeTableComponent } from '../system-main-card-event-realtime-table/system-main-card-event-realtime-table.component';
import { SystemMainCardEventRealtimeTableManagerBusiness } from './system-main-card-event-realtime-table-manager.business';

@Component({
  selector: 'ias-system-main-card-event-realtime-table-manager',
  imports: [
    CommonModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventRealtimeTableComponent,
  ],
  templateUrl: './system-main-card-event-realtime-table-manager.component.html',
  styleUrl: './system-main-card-event-realtime-table-manager.component.less',
  providers: [SystemMainCardEventRealtimeTableManagerBusiness],
})
export class SystemMainCardEventRealtimeTableManagerComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output() position = new EventEmitter<MobileEventRecord>();
  @Output() loaded = new EventEmitter<MobileEventRecord[]>();

  constructor(
    private business: SystemMainCardEventRealtimeTableManagerBusiness
  ) {}
  title = '实时事件';
  datas: MobileEventRecord[] = [];

  duration = DateTimeTool.last.year(new Date());
  private subscription = new Subscription();
  ngOnInit(): void {
    this.regist();
    this.load();
  }
  private regist() {
    if (this._load) {
      this.subscription.add(
        this._load.subscribe(() => {
          this.load();
        })
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load() {
    this.business.load(this.duration).then((datas) => {
      this.datas = datas;
      this.loaded.emit(this.datas);
    });
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
