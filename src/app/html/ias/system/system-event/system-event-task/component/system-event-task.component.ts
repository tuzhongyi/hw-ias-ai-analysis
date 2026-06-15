import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { IPictureModel } from '../../../../share/picture/component/picture.model';
import { SystemEventTaskAssginComponent } from '../system-event-task-assgin/system-event-task-assgin.component';
import { SystemEventTaskHandleComponent } from '../system-event-task-handle/system-event-task-handle.component';
import { SystemEventTaskTimelineComponent } from '../system-event-task-timeline/system-event-task-timeline.component';

@Component({
  selector: 'ias-system-event-task',
  imports: [
    CommonModule,
    SystemEventTaskTimelineComponent,
    SystemEventTaskAssginComponent,
    SystemEventTaskHandleComponent,
  ],
  templateUrl: './system-event-task.component.html',
  styleUrl: './system-event-task.component.less',
})
export class SystemEventTaskComponent implements OnInit, OnChanges {
  @Input() data?: MobileEventRecord;
  @Output() assgin = new EventEmitter<MobileEventRecord>();

  constructor() {}

  unhandle = {
    datas: [] as IPictureModel[],
    index: 0,
    title: '处置前',
    nodata: '无数据',
  };
  handled = {
    datas: [] as IPictureModel[],
    index: 0,
    title: '处置后',
    nodata: '待处置',
  };

  private change = {
    data: (change: SimpleChange) => {
      if (change && !change.firstChange) {
        if (this.data) {
          this.timeline.load.emit(this.data);
          this.load(this.data);
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  ngOnInit(): void {
    if (this.data) {
      this.load(this.data);

      // this.unhandle.index = this.data.UnHandleIndex;
    }
  }

  private load(data: MobileEventRecord) {
    if (data.Resources) {
      this.unhandle.datas = data.Resources.map((resource) => {
        let model: IPictureModel = {
          id: resource.ImageUrl,
          polygon: resource.Objects?.map((x) => x.Polygon),
        };
        return model;
      });
    }
    if (data.Assignment && data.Assignment.HandledImageUrls) {
      this.handled.datas = data.Assignment.HandledImageUrls.map((x) => {
        let model: IPictureModel = {
          id: x,
        };
        return model;
      });
    }
  }

  timeline = {
    load: new EventEmitter<MobileEventRecord>(),
  };

  on = {
    assgin: () => {
      this.assgin.emit(this.data);
    },
  };
}
