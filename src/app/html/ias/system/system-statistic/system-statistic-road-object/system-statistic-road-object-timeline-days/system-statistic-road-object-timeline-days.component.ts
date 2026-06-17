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

class TimelineDayPoint {
  id = '';
  position = 0;
  color = '';
  title = '';
  objectId = '';
  data?: RoadObjectEventRecord;
}

class TimelineDay {
  date = new Date();
  label = '';
  points: TimelineDayPoint[] = [];
  width = 0;
}

@Component({
  selector: 'ias-system-statistic-road-object-timeline-days',
  imports: [CommonModule, SystemStatisticRoadObjectMapInfoSimpleComponent],
  templateUrl: './system-statistic-road-object-timeline-days.component.html',
  styleUrl: './system-statistic-road-object-timeline-days.component.less',
})
export class SystemStatisticRoadObjectTimelineDaysComponent implements OnChanges {
  @Input('datas') records: RoadObjectEventRecord[] = [];
  @Input() selected?: RoadObjectEventRecord;
  @Output() selectedChange = new EventEmitter<RoadObjectEventRecord>();
  @Output() mousehover = new EventEmitter<RoadObjectEventRecord>();
  @Input('hover') recordhover?: RoadObjectEventRecord;

  constructor() {}

  days: TimelineDay[] = [];
  hover?: TimelineDayPoint;

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
    if (datas.length === 0) {
      this.days = [];
      return;
    }

    // 按天分组
    let groups = new Map<string, RoadObjectEventRecord[]>();
    for (let data of datas) {
      let key = this.dayKey(data.EventTime);
      let group = groups.get(key);
      if (!group) {
        group = [];
        groups.set(key, group);
      }
      group.push(data);
    }

    this.days = [];
    let entries = Array.from(groups.entries());

    for (let [key, items] of entries) {
      let day = new TimelineDay();
      day.date = items[0].EventTime;
      day.label = formatDate(day.date, 'MM月dd日', 'en');

      // 这一天的宽度 = 当天数据量 / 总数据量
      day.width = (items.length / datas.length) * 100;

      // 天内的点位，按容器均匀分布
      for (let i = 0; i < items.length; i++) {
        let record = items[i];
        let point = new TimelineDayPoint();
        point.id = record.Id;
        point.data = record;
        point.objectId = record.RoadObjectId;

        point.position = items.length > 1 ? (i / (items.length - 1)) * 100 : 50;

        // 颜色
        switch (record.EventType) {
          case RoadObjectEventType.Inspection:
            point.color = ColorTool.green;
            break;
          case RoadObjectEventType.Breakage:
            point.color = ColorTool.orange;
            break;
          case RoadObjectEventType.Disappear:
            point.color = ColorTool.red;
            break;
          default:
            break;
        }

        point.title = `${record.RoadObjectName}\n${formatDate(
          record.EventTime,
          Language.yyyyMMddHHmmss,
          'en',
        )}`;
        day.points.push(point);
      }

      this.days.push(day);
    }
  }

  private dayKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  on = {
    mouseover: (data: TimelineDayPoint) => {
      let item = data.data;
      if (!item) {
        item = this.records.find((x) => x.Id == data.id);
      }
      this.hover = data;
      this.mousehover.emit(item);
    },
    mouseout: (data: TimelineDayPoint) => {
      if (this.hover) {
        if (this.hover.id == data.id) {
          this.hover = undefined;
        }
      }
    },
    click: (data: TimelineDayPoint) => {
      let item = data.data;
      if (!item) {
        item = this.records.find((x) => x.Id == data.id);
      }
      this.selectedChange.emit(item);
    },
  };
}
