import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeSegment } from '../../../data-core/models/arm/analysis/segment/time-segment.model';
import { WeekTimeSegment } from '../../../data-core/models/arm/analysis/segment/week-time-segment.model';
import { Language } from '../../../tools/language-tool/language';
import { SegmentDayComponent } from '../segment-day/segment-day.component';

@Component({
  selector: 'ias-segment-week',
  imports: [CommonModule, FormsModule, SegmentDayComponent],
  templateUrl: './segment-week.component.html',
  styleUrl: './segment-week.component.less',
})
export class SegmentWeekComponent implements OnInit {
  @Input('data') _data = new WeekTimeSegment();
  @Output() dataChange = new EventEmitter<WeekTimeSegment>();

  times: TimeSegment[] = [];
  weeks = [1, 2, 3, 4, 5, 6, 0];
  week: number = 1;
  Language = Language;

  ngOnInit(): void {
    let day = this._data?.Days?.find((x) => x.DayOfWeek == this.week);
    if (day) {
      this.times = day.Segments ?? [];
    }
  }

  on = {
    week: (week: number) => {
      this.week = week;
    },
  };
}
