import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayTimeSegment } from '../../../data-core/models/arm/analysis/segment/day-time-segment.model';
import { TimeSegment } from '../../../data-core/models/arm/analysis/segment/time-segment.model';
import { WeekTimeSegment } from '../../../data-core/models/arm/analysis/segment/week-time-segment.model';
import { Language } from '../../../tools/language-tool/language';
import { SegmentDayComponent } from '../segment-day/segment-day.component';
import { SegmentWeekCopyComponent } from '../segment-week-copy/segment-week-copy.component';
import { SegmentWeekWindow } from './segment-week.window';

@Component({
  selector: 'ias-segment-week',
  imports: [
    CommonModule,
    FormsModule,
    SegmentDayComponent,
    SegmentWeekCopyComponent,
  ],
  templateUrl: './segment-week.component.html',
  styleUrl: './segment-week.component.less',
})
export class SegmentWeekComponent implements OnInit {
  @Input('data') data = new WeekTimeSegment();
  @Output() dataChange = new EventEmitter<WeekTimeSegment>();

  times: TimeSegment[] = [];
  weeks = [1, 2, 3, 4, 5, 6, 0];
  week: number = 1;
  Language = Language;
  window = new SegmentWeekWindow();

  ngOnInit(): void {
    if (!this.data.Days) {
      this.data.Days = [];
    }
    let day = this.data?.Days?.find((x) => x.DayOfWeek == this.week);
    if (day) {
      this.times = day.Segments ?? [];
    }
  }

  has(week: number) {
    let day = this.data.Days.find((x) => x.DayOfWeek == week);
    if (day) {
      return day.Segments && day.Segments.length > 0;
    }
    return false;
  }

  on = {
    week: (week: number) => {
      this.week = week;
      let day = this.data.Days.find((x) => x.DayOfWeek == this.week);
      if (day) {
        this.times = [...(day.Segments ?? [])];
      } else {
        this.times = [];
      }
    },
    change: () => {
      let day = this.data.Days.find((x) => x.DayOfWeek == this.week);
      if (day) {
        day.Segments = [...this.times];
      } else {
        day = new DayTimeSegment();
        day.DayOfWeek = this.week;
        day.Segments = [...this.times];
        this.data.Days.push(day);
        this.data.Days = this.data.Days.sort(
          (a, b) => a.DayOfWeek - b.DayOfWeek
        );
      }
      this.dataChange.emit(this.data);
    },
    copy: {
      open: () => {
        this.window.copy.show = true;
      },
      to: (weeks: number[]) => {
        let source = this.data.Days.find((x) => x.DayOfWeek == this.week);
        if (source && source.Segments) {
          for (let i = 0; i < weeks.length; i++) {
            const week = weeks[i];
            if (week === this.week) continue;

            let day = this.data.Days.find((x) => x.DayOfWeek == week);
            if (day) {
              day.Segments = source.Segments.map((x) => {
                return Object.assign(new TimeSegment(), x);
              });
            } else {
              day = new DayTimeSegment();
              day.DayOfWeek = week;
              day.Segments = source.Segments.map((x) => {
                return Object.assign(new TimeSegment(), x);
              });
              this.data.Days.push(day);
              this.data.Days = this.data.Days.sort(
                (a, b) => a.DayOfWeek - b.DayOfWeek
              );
            }
          }
          this.dataChange.emit(this.data);
        }

        this.window.copy.show = false;
      },
    },
  };
}
