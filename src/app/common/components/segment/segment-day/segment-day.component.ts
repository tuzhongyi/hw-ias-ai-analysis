import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeSegment } from '../../../data-core/models/arm/analysis/segment/time-segment.model';
import { Time } from '../../../data-core/models/common/time.model';
import { TimeControlComponent } from '../../time-control/time-control.component';
import { TimeModel } from '../../time-control/time-control.model';
import { SegmentTimeModel } from './segment-day.model';

@Component({
  selector: 'ias-segment-day',
  imports: [CommonModule, FormsModule, TimeControlComponent],
  templateUrl: './segment-day.component.html',
  styleUrl: './segment-day.component.less',
})
export class SegmentDayComponent implements OnInit {
  @Input() datas: TimeSegment[] = [];
  @Output() datasChange: EventEmitter<TimeSegment[]> = new EventEmitter();

  constructor() {}

  models: SegmentTimeModel[] = [];

  ngOnInit(): void {
    this.models = this.datas.map((x) => this.convert.from(x));
  }

  on = {
    remove: (index: number) => {
      if (this.models) {
        this.models.splice(index, 1);
        this.datas = this.models.map((x) => this.convert.to(x));
        this.datasChange.emit(this.datas);
      }
    },
    create: () => {
      let model: SegmentTimeModel = {
        StartTime: new TimeModel(8, 0, 0),
        StopTime: new TimeModel(16, 0, 0),
      };
      this.models.push(model);
      this.datas = this.models.map((x) => this.convert.to(x));
      this.datasChange.emit(this.datas);
    },
  };

  private convert = {
    to: (source: SegmentTimeModel) => {
      let data = new TimeSegment();
      data.StartTime = new Time(
        source.StartTime.hour.value,
        source.StartTime.minute.value,
        source.StartTime.second.value
      );
      data.StopTime = new Time(
        source.StopTime.hour.value,
        source.StopTime.minute.value,
        source.StopTime.second.value
      );
      return data;
    },
    from: (data: TimeSegment) => {
      let model: SegmentTimeModel = {
        StartTime: new TimeModel(data.StartTime.toDate()),
        StopTime: new TimeModel(data.StopTime.toDate()),
      };
      return model;
    },
  };
}
