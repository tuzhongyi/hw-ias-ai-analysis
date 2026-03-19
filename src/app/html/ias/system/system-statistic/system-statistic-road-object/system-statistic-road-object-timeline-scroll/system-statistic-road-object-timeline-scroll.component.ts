import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RoadObjectEventType } from '../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ScrollBarDirective } from '../../../../../../common/directives/scroll/scroll-bar.directive';
import { ScrollDirective } from '../../../../../../common/directives/scroll/scroll.directive';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { wait } from '../../../../../../common/tools/wait';
import { SystemStatisticRoadObjectTimelineScrollBarComponent } from '../system-statistic-road-object-timeline-scroll-bar/system-statistic-road-object-timeline-scroll-bar.component';
import { SystemStatisticRoadObjectTimelineScrollItem } from './system-statistic-road-object-timeline-scroll.model';

@Component({
  selector: 'ias-system-statistic-road-object-timeline-scroll',
  imports: [
    CommonModule,
    ScrollBarDirective,
    SystemStatisticRoadObjectTimelineScrollBarComponent,
  ],
  templateUrl: './system-statistic-road-object-timeline-scroll.component.html',
  styleUrl: './system-statistic-road-object-timeline-scroll.component.less',
})
export class SystemStatisticRoadObjectTimelineScrollComponent
  implements OnChanges
{
  @Input('datas') records: RoadObjectEventRecord[] = [];
  @Input() selected?: RoadObjectEventRecord;
  @Input() position: number = 0;
  @Output() positionChange = new EventEmitter<number>();
  @Input() container?: HTMLDivElement;

  constructor() {}

  @ViewChild(ScrollDirective) scroll?: ScrollDirective;

  datas: SystemStatisticRoadObjectTimelineScrollItem[] = [];
  bar = {
    width: 0,
    begin: new Date(),
    end: new Date(),
    init: () => {
      if (this.container) {
        let container = this.container;
        wait(() => {
          return (
            container.clientWidth > 0 &&
            container.scrollWidth > container.clientWidth
          );
        }).then(() => {
          let width = HtmlTool.scroll.thumb.width(container);
          this.bar.width = (width / container.clientWidth) * 100;
          this.bar.load(this.position);
        });
      }
    },
    load: (position: number) => {
      let records = this.getRangeRecords(this.datas, this.bar.width, position);
      if (records.length >= 2) {
        this.bar.begin = records[0].time;
        this.bar.end = records[records.length - 1].time;
      }
    },
  };
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

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        if (this.records.length > 0) {
          this.time.load(this.records);
          this.datas = this.records.map((x, i) =>
            this.convert(x, i, this.records.length)
          );
        } else {
          this.datas = [];
        }
        if (!simple.firstChange) {
          this.bar.init();
        }
      }
    },
    container: (simple: SimpleChange) => {
      if (simple) {
        this.bar.init();
      }
    },
    position: (simple: SimpleChange) => {
      if (simple) {
        let position = this.position;

        // position = this.position + this.bar.width / 2;
        // position = Math.max(0, position);
        // position = Math.min(100 - this.bar.width, position);

        // console.log(this.position, this.bar.width);

        this.bar.load(position);
      }
    },
    selected: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.selected) {
          let item = this.datas.find((x) => x.id === this.selected?.Id);
          if (item) {
            let percent = item.position;
            this.position = percent - this.bar.width / 2;
            this.position = Math.max(0, this.position);
            this.position = Math.min(100 - this.bar.width, this.position);
            this.positionChange.emit(this.position);
          }
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['records']);
    this.change.position(changes['position']);
    this.change.container(changes['container']);
    this.change.selected(changes['selected']);
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
    item.position = (index / count) * 100;
    item.time = data.EventTime;
    item.title = `${data.RoadObjectName}\n${formatDate(
      data.EventTime,
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    return item;
  }

  on = {
    position: (value: number) => {
      this.positionChange.emit(value * 100);
      this.bar.load(value * 100);
    },
    click: (e: MouseEvent) => {
      let target = e.currentTarget as HTMLDivElement;
      const barRect = target.getBoundingClientRect();
      let x = e.clientX - barRect.left;
      let max = 100 - this.bar.width;

      let current = (x / target.clientWidth) * 100;
      if (x < 0) {
        current = 0;
      } else if (x > target.clientWidth) {
        current = max;
      }
      if (
        x + (this.bar.width / 100) * target.clientWidth >
        target.clientWidth
      ) {
        current = max;
      }

      this.position = current;
      this.positionChange.emit(this.position);
    },
  };

  getRangeRecords(
    records: SystemStatisticRoadObjectTimelineScrollItem[],
    range: number,
    percent: number
  ): SystemStatisticRoadObjectTimelineScrollItem[] {
    // if (!records || records.length === 0) return [];

    // // 初步左右边界
    // let start = percent - range / 2;
    // let end = percent + range / 2;

    // // 处理边界
    // if (start < 0) {
    //   start = 0;
    //   end = range;
    // } else if (end > 100) {
    //   end = 100;
    //   start = 100 - range;
    // }

    // // 确保不越界
    // start = Math.max(0, start);
    // end = Math.min(100, end);

    // return records.filter((r) => r.position >= start && r.position <= end);

    if (!records.length) return [];

    // 限制 percent 合法（关键！）
    percent = Math.max(0, Math.min(percent, 100 - range));

    const start = percent;
    const end = percent + range;

    return records.filter((r) => r.position >= start && r.position <= end);
  }
}
