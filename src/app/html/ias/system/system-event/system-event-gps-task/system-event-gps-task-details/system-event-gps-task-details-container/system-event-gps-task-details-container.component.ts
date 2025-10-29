import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { IASMapComponent } from '../../../../../share/map/ias-map.component';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { SystemEventGpsTaskDetailsInformationComponent } from '../system-event-gps-task-details-information/system-event-gps-task-details-information.component';
import { SystemEventGpsTaskDetailsContainerBusiness } from './system-event-gps-task-details-container.business';

@Component({
  selector: 'ias-system-event-gps-task-details-container',
  imports: [
    CommonModule,
    ContainerZoomComponent,
    PictureComponent,
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

  constructor(private business: SystemEventGpsTaskDetailsContainerBusiness) {}
  ngOnInit(): void {
    if (this.data) {
      this.video.load(this.data);
    }
  }

  video = {
    src: '',
    load: (data: GpsTaskSampleRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        if (resource.RecordUrl) {
          this.video.src = this.business.video.src(resource.RecordUrl);
        }
      }
    },
  };

  picture = {
    src: '',
    load: (data: GpsTaskSampleRecord) => {
      if (data.Images && data.Images.length > 0) {
        let image = data.Images[0];
        this.picture.src = image.ImageUrl;
      }
    },
  };

  on = {
    close: () => {
      this.close.emit();
    },
  };
}
