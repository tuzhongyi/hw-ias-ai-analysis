import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  Paged,
} from '../../../../../../../common/data-core/models/page-list.model';
import { IASMapComponent } from '../../../../../share/map/ias-map.component';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { PicturePolygonComponent } from '../../../../../share/picture/picture-polygon/picture-polygon.component';
import { SystemEventGpsTaskDetailsInformationComponent } from '../system-event-gps-task-details-information/system-event-gps-task-details-information.component';
import { SystemEventGpsTaskDetailsContainerBusiness } from './system-event-gps-task-details-container.business';

@Component({
  selector: 'ias-system-event-gps-task-details-container',
  imports: [
    CommonModule,
    ContainerZoomComponent,
    PictureComponent,
    PicturePolygonComponent,
    IASMapComponent,
    SystemEventGpsTaskDetailsInformationComponent,
  ],
  templateUrl: './system-event-gps-task-details-container.component.html',
  styleUrl: './system-event-gps-task-details-container.component.less',
  providers: [SystemEventGpsTaskDetailsContainerBusiness],
})
export class SystemEventGpsTaskDetailsContainerComponent implements OnInit {
  @Input() data?: GpsTaskSampleRecord;
  @Output() close = new EventEmitter<void>();

  @Output('picture') image = new EventEmitter<Paged<GpsTaskSampleRecord>>();
  @Output() video = new EventEmitter<GpsTaskSampleRecord>();

  constructor() {}
  ngOnInit(): void {
    if (this.data) {
      this.picture.load(this.data);
      this.disabled.load(this.data);
    }
  }

  picture = {
    data: {
      task: {
        src: '',
        reset: false,
        page: undefined as Page | undefined,
        polygon: [] as HowellPoint[],
      },
      result: { src: '', reset: false, page: undefined as Page | undefined },
    },
    load: (data: GpsTaskSampleRecord) => {
      if (data.Images && data.Images.length > 0) {
        let image = data.Images[0];
        let page = Page.create(1, 1, data.Images?.length ?? 0);
        this.picture.data.task = {
          page: page,
          reset: false,
          src: image.ImageUrl,
          polygon: [],
        };
        if (image.Labels && image.Labels.length > 0) {
          let label = image.Labels[0];
          this.picture.data.task.polygon = [...label.Polygon];
        }
      }
      if (data.SceneMatchImages && data.SceneMatchImages.length > 0) {
        let image = data.SceneMatchImages[0];
        let page = Page.create(1, 1, data.SceneMatchImages?.length ?? 0);

        this.picture.data.result = {
          page: page,
          reset: false,
          src: image.ImageUrl,
        };
      }
    },
  };

  disabled = {
    load: (data: GpsTaskSampleRecord) => {
      let task = data.Images && data.Images.length > 0;
      this.disabled.task.full = !task;
      this.disabled.task.reset = !task;

      let result = data.SceneMatchImages && data.SceneMatchImages.length > 0;
      this.disabled.result.full = !result;
      this.disabled.result.reset = !result;

      let resource =
        data.Resources &&
        data.Resources.length > 0 &&
        !!data.Resources[0].RecordUrl;
      this.disabled.result.video = !resource;
    },
    task: {
      full: false,
      reset: false,
    },
    result: {
      full: false,
      reset: false,
      video: false,
    },
  };

  on = {
    close: () => {
      this.close.emit();
    },
    picture: (index: number) => {
      if (this.data) {
        let imagecount = this.data.Images?.length ?? 0;
        let scenecount = this.data.SceneMatchImages?.length ?? 0;
        let count = imagecount + scenecount;
        let paged = Paged.create(this.data, index + 1, 1, count);
        this.image.emit(paged);
      }
    },
    video: () => {
      if (this.data) {
        this.video.emit(this.data);
      }
    },
  };
}
