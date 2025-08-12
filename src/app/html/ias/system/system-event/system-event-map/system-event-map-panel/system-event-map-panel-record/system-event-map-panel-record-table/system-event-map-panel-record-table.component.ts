import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ArmEventType } from '../../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { IConverter } from '../../../../../../../../common/data-core/models/converter.interface';
import { Page } from '../../../../../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import { SystemEventMapPanelRecordTableBusiness } from './system-event-map-panel-record-table.business';
import { MobileEventRecordModel } from './system-event-map-panel-record-table.model';

@Component({
  template: '',
})
export abstract class SystemEventMapPanelRecordTableComponent {
  @Input('datas') records: MobileEventRecord[] = [];

  @Input() selected?: MobileEventRecord;
  @Output() selectedChange = new EventEmitter<MobileEventRecord>();
  @Output() itemhover = new EventEmitter<MobileEventRecord>();
  @Output() itemblur = new EventEmitter<MobileEventRecord>();
  @Output() details = new EventEmitter<MobileEventRecord>();
  @Output() position = new EventEmitter<MobileEventRecord>();
  @Output() video = new EventEmitter<MobileEventRecord>();

  constructor(private business: SystemEventMapPanelRecordTableBusiness) {}

  abstract converter: IConverter<MobileEventRecord, MobileEventRecordModel>;

  widths = ['50px', 'auto', '90px', '85px', '70px', '106px'];
  datas: Array<MobileEventRecordModel | undefined> = [];
  page = new Page();
  Color = ColorTool;
  EventType = ArmEventType;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['records']);
    this.change.selected(changes['selected']);
  }
  change = {
    datas: (change: SimpleChange) => {
      if (change) {
        if (this.records) {
          this.load(1, 12, this.records);
        }
      }
    },
    selected: (change: SimpleChange) => {
      if (change && !change.firstChange) {
        if (this.selected) {
          let index = this.records.findIndex((x) => x.Id === this.selected?.Id);
          if (index >= 0) {
            let pageindex = Math.floor(index / this.page.PageSize) + 1;
            if (pageindex != this.page.PageIndex) {
              this.load(pageindex, this.page.PageSize, this.records);
            }
            this.selected = this.records[index];
            this.selectedChange.emit(this.selected);
          }
        }
      }
    },
  };

  private async load(index: number, size: number, shops: MobileEventRecord[]) {
    return this.business.load(index, size, [...shops]).then((x) => {
      this.datas = x.Data.map((x) => this.converter.convert(x));
      this.page = x.Page;
      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
      return this.records;
    });
  }

  on = {
    select: (item?: MobileEventRecord) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    details: (e: Event, item?: MobileEventRecord) => {
      this.details.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    video: (e: Event, item?: MobileEventRecord) => {
      this.video.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    position: (e: Event, item?: MobileEventRecord) => {
      this.position.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },

    page: (index: number) => {
      this.load(index, this.page.PageSize, this.records);
    },
    mouse: {
      over: (item?: MobileEventRecord) => {
        if (item) {
          this.itemhover.emit(item);
        }
      },
      out: (item?: MobileEventRecord) => {
        if (item) {
          this.itemblur.emit(item);
        }
      },
    },
  };
}
