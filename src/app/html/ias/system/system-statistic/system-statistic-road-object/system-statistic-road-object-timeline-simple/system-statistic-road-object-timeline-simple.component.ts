import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { RoadObjectEventType } from '../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticRoadObjectMapInfoSimpleComponent } from '../system-statistic-road-object-map-info/system-statistic-road-object-map-info-simple/system-statistic-road-object-map-info-simple.component';
import { SystemStatisticRoadObjectTimelineScrollItem } from '../system-statistic-road-object-timeline-scroll/system-statistic-road-object-timeline-scroll.model';

@Component({
  selector: 'ias-system-statistic-road-object-timeline-simple',
  imports: [CommonModule, SystemStatisticRoadObjectMapInfoSimpleComponent],
  templateUrl: './system-statistic-road-object-timeline-simple.component.html',
  styleUrl: './system-statistic-road-object-timeline-simple.component.less',
})
export class SystemStatisticRoadObjectTimelineSimpleComponent
  implements OnChanges
{
  @Input('datas') records: RoadObjectEventRecord[] = [];
  @Input() selected?: RoadObjectEventRecord;
  @Output() selectedChange = new EventEmitter<RoadObjectEventRecord>();
  @Output() mousehover = new EventEmitter<RoadObjectEventRecord>();

  constructor() {}

  datas: SystemStatisticRoadObjectTimelineScrollItem[] = [];
  hover?: SystemStatisticRoadObjectTimelineScrollItem;
  time = {
    begin: new Date(),
    end: new Date(),
    load: (datas: RoadObjectEventRecord[]) => {
      if (datas.length >= 2) {
        this.time.begin = datas[0].EventTime;
        this.time.end = datas[datas.length - 1].EventTime;
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['records']);
  }
  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.load(this.records);
      }
    },
  };
  private load(datas: RoadObjectEventRecord[]) {
    this.datas = datas.map((x, i) => this.convert(x, i, datas.length));
    this.time.load(datas);
  }
  private convert(data: RoadObjectEventRecord, index: number, count: number) {
    let item = new SystemStatisticRoadObjectTimelineScrollItem();
    switch (data.EventType) {
      case RoadObjectEventType.Inspection:
        item.color = ColorTool.green;
        break;
      case RoadObjectEventType.Breakage:
        item.color = ColorTool.orange;
        break;
      case RoadObjectEventType.Disappear:
        item.color = ColorTool.red;
        break;
      default:
        break;
    }

    // let current = data.EventTime.getTime();
    // let begin = duration.begin.getTime();
    // let end = duration.end.getTime();
    // item.position = ((current - begin) / (end - begin)) * 100;

    item.id = data.Id;
    item.position = (index / (count - 1)) * 100;
    item.time = data.EventTime;
    item.title = `${data.RoadObjectName}\n${formatDate(
      data.EventTime,
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    item.data = data;
    return item;
  }

  on = {
    mouseover: (data: SystemStatisticRoadObjectTimelineScrollItem) => {
      let item = data.data;
      if (!item) {
        item = this.records.find((x) => x.Id == data.id);
      }
      this.hover = data;
      this.mousehover.emit(item);
    },
    mouseout: (data: SystemStatisticRoadObjectTimelineScrollItem) => {
      if (this.hover) {
        if (this.hover.id == data.id) {
          this.hover = undefined;
        }
      }
    },
    click: (data: SystemStatisticRoadObjectTimelineScrollItem) => {
      let item = data.data;
      if (!item) {
        item = this.records.find((x) => x.Id == data.id);
      }

      this.selectedChange.emit(item);
    },
  };
}
