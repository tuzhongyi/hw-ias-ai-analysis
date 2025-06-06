import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class SystemEventTaskComponent implements OnInit {
  @Input() data?: MobileEventRecord;

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

  ngOnInit(): void {
    if (this.data) {
      if (this.data.Resources) {
        this.unhandle.datas = this.data.Resources.map((resource) => {
          let model: IPictureModel = {
            id: resource.ImageUrl,
            polygon: resource.Objects?.map((x) => x.Polygon),
          };
          return model;
        });
      }
      if (this.data.Assignment && this.data.Assignment.HandledImageUrls) {
        this.handled.datas = this.data.Assignment.HandledImageUrls.map((x) => {
          let model: IPictureModel = {
            id: x,
          };
          return model;
        });
      }

      // this.unhandle.index = this.data.UnHandleIndex;
    }
  }
}
