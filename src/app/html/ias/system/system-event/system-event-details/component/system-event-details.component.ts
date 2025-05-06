import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EventRecord } from '../../../../../../common/data-core/models/arm/event/event-record.model';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { IPictureModel } from '../../../../share/picture/component/picture.model';
import { SystemEventDetailsAssginComponent } from '../system-event-details-assgin/system-event-details-assgin.component';
import { SystemEventDetailsHandleComponent } from '../system-event-details-handle/system-event-details-handle.component';
import { SystemEventDetailsTimelineComponent } from '../system-event-details-timeline/system-event-details-timeline.component';

@Component({
  selector: 'ias-system-event-details',
  imports: [
    CommonModule,
    ContentHeaderComponent,
    SystemEventDetailsTimelineComponent,
    SystemEventDetailsAssginComponent,
    SystemEventDetailsHandleComponent,
  ],
  templateUrl: './system-event-details.component.html',
  styleUrl: './system-event-details.component.less',
})
export class SystemEventDetailsComponent implements OnInit {
  @Input() data?: EventRecord;

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
