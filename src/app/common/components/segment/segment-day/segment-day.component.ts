import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
export class SegmentDayComponent implements OnChanges {
  @Input() datas: TimeSegment[] = [];
  @Output() datasChange: EventEmitter<TimeSegment[]> = new EventEmitter();

  constructor() {}

  models: SegmentTimeModel[] = [];

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.models = this.datas.map((x) => this.convert.from(x));
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
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
    change: () => {
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
      let start = new Date();
      start.setHours(
        data.StartTime.hour,
        data.StartTime.minute,
        data.StartTime.second
      );
      let stop = new Date();
      stop.setHours(
        data.StopTime.hour,
        data.StopTime.minute,
        data.StopTime.second
      );
      let model: SegmentTimeModel = {
        StartTime: new TimeModel(start),
        StopTime: new TimeModel(stop),
      };
      return model;
    },
  };
}
