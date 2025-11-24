import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { EventMode } from '../../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainCardContainerComponent } from '../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventMobileTableComponent } from '../system-main-card-event-mobile-table/system-main-card-event-mobile-table/system-main-card-event-mobile-table.component';
import { SystemMainCardEventSampleTableComponent } from '../system-main-card-event-sample-table/system-main-card-event-sample-table/system-main-card-event-sample-table.component';

@Component({
  selector: 'ias-system-main-card-event-table',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventSampleTableComponent,
    SystemMainCardEventMobileTableComponent,
  ],
  templateUrl: './system-main-card-event-table.component.html',
  styleUrl: './system-main-card-event-table.component.less',
})
export class SystemMainCardEventTableComponent {
  @Input() shops: MobileEventRecord[] = [];
  @Input() realtimes: MobileEventRecord[] = [];
  @Input() samples: GpsTaskSampleRecord[] = [];
  @Output() details = new EventEmitter<
    GpsTaskSampleRecord | MobileEventRecord
  >();
  @Output() position = new EventEmitter<
    GpsTaskSampleRecord | MobileEventRecord
  >();
  @Input() mode = EventMode.gpstask;
  @Input() modeable = true;

  constructor() {}

  Mode = EventMode;

  get title() {
    let name = '';
    switch (this.mode) {
      case EventMode.shop:
        name = '商铺更变';
        break;
      case EventMode.realtime:
        name = '实时事件';
        break;
      case EventMode.gpstask:
        name = '场景事件';
        break;
    }
    return `今日${name}`;
  }

  on = {
    details: (item: GpsTaskSampleRecord | MobileEventRecord) => {
      this.details.emit(item);
    },
    position: (item: GpsTaskSampleRecord | MobileEventRecord) => {
      this.position.emit(item);
    },
  };
}
