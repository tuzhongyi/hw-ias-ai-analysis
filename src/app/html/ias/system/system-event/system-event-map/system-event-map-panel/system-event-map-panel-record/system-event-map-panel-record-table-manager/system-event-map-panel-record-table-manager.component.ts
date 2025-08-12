import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventMapPanelRecordTableAnalysisComponent } from '../system-event-map-panel-record-table/system-event-map-panel-record-table-analysis/system-event-map-panel-record-table-analysis.component';
import { SystemEventMapPanelRecordTableRealtimeComponent } from '../system-event-map-panel-record-table/system-event-map-panel-record-table-realtime/system-event-map-panel-record-table-realtime.component';
import { SystemEventMapPanelRecordTableShopComponent } from '../system-event-map-panel-record-table/system-event-map-panel-record-table-shop/system-event-map-panel-record-table-shop.component';
import { MobileEventRecordMode } from '../system-event-map-panel-record-table/system-event-map-panel-record-table.model';

@Component({
  selector: 'ias-system-event-map-panel-record-table-manager',
  imports: [
    CommonModule,
    SystemEventMapPanelRecordTableShopComponent,
    SystemEventMapPanelRecordTableRealtimeComponent,
    SystemEventMapPanelRecordTableAnalysisComponent,
  ],
  templateUrl: './system-event-map-panel-record-table-manager.component.html',
  styleUrl: './system-event-map-panel-record-table-manager.component.less',
})
export class SystemEventMapPanelRecordTableManagerComponent {
  @Input() mode = MobileEventRecordMode.shop;
  @Input() datas: MobileEventRecord[] = [];
  @Input() selected?: MobileEventRecord;
  @Output() selectedChange = new EventEmitter<MobileEventRecord>();
  @Output() itemhover = new EventEmitter<MobileEventRecord>();
  @Output() itemblur = new EventEmitter<MobileEventRecord>();
  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output() position = new EventEmitter<MobileEventRecord>();
  @Output() video = new EventEmitter<MobileEventRecord>();

  constructor() {}

  Mode = MobileEventRecordMode;

  on = {
    select: (item?: MobileEventRecord) => {
      this.selectedChange.emit(item);
    },
    details: (item: MobileEventRecord) => {
      this.details.emit(item);
    },
    position: (item: MobileEventRecord) => {
      this.position.emit(item);
    },
    video: (item: MobileEventRecord) => {
      this.video.emit(item);
    },
    item: {
      over: (item: MobileEventRecord) => {
        this.itemhover.emit(item);
      },
      out: (item: MobileEventRecord) => {
        this.itemblur.emit(item);
      },
    },
  };
}
