import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventMapContainerComponent } from '../system-event-map-container/system-event-map-container.component';
import { SystemEventMapPanelRecordTableManagerComponent } from '../system-event-map-panel/system-event-map-panel-record/system-event-map-panel-record-table-manager/system-event-map-panel-record-table-manager.component';
import { MobileEventRecordMode } from '../system-event-map-panel/system-event-map-panel-record/system-event-map-panel-record-table/system-event-map-panel-record-table.model';
import { SystemEventMapPanelSearchComponent } from '../system-event-map-panel/system-event-map-panel-search/system-event-map-panel-search.component';
import { SystemEventMapPanelStateComponent } from '../system-event-map-panel/system-event-map-panel-state/system-event-map-panel-state.component';
import { SystemEventMapManagerBusiness } from './system-event-map-manager.business';
import { SystemEventMapArgs } from './system-event-map-manager.model';

@Component({
  selector: 'ias-system-event-map-manager',
  imports: [
    SystemEventMapContainerComponent,

    SystemEventMapPanelSearchComponent,
    SystemEventMapPanelRecordTableManagerComponent,
    SystemEventMapPanelStateComponent,
  ],
  templateUrl: './system-event-map-manager.component.html',
  styleUrl: './system-event-map-manager.component.less',
  providers: [SystemEventMapManagerBusiness],
})
export class SystemEventMapManagerComponent implements OnInit {
  @Input() args = new SystemEventMapArgs();
  @Input() mode = MobileEventRecordMode.shop;
  @Input('load') _load = new EventEmitter<SystemEventMapArgs>();

  @Output() video = new EventEmitter<MobileEventRecord>();
  @Output() details = new EventEmitter<MobileEventRecord>();

  constructor(private business: SystemEventMapManagerBusiness) {}

  datas: MobileEventRecord[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
    });
  }

  map = {
    over: new EventEmitter<MobileEventRecord>(),
    out: new EventEmitter<MobileEventRecord>(),
    focus: new EventEmitter<MobileEventRecord>(),
    on: {
      select: (data: MobileEventRecord) => {
        this.table.selected = data;
      },
    },
  };

  on = {
    search: (args: SystemEventMapArgs) => {
      this.args = args;
      this.load();
    },
    state: (states: number[]) => {
      this.args.state = states;
      this.load();
    },
  };

  table = {
    selected: undefined as MobileEventRecord | undefined,
    on: {
      details: (item: MobileEventRecord) => {
        this.details.emit(item);
      },
      video: (item: MobileEventRecord) => {
        this.video.emit(item);
      },
      position: (item: MobileEventRecord) => {
        this.map.focus.emit(item);
      },
      item: {
        over: (item: MobileEventRecord) => {
          this.map.over.emit(item);
        },
        out: (item: MobileEventRecord) => {
          this.map.out.emit(item);
        },
      },
    },
  };
}
