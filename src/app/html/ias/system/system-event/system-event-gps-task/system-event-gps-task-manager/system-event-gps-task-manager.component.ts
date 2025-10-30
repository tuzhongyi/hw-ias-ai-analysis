import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemEventGpsTaskDetailsContainerComponent } from '../system-event-gps-task-details/system-event-gps-task-details-container/system-event-gps-task-details-container.component';
import { SystemEventGpsTaskTableComponent } from '../system-event-gps-task-table/system-event-gps-task-table.component';
import { SystemEventGpsTaskTableArgs } from '../system-event-gps-task-table/system-event-gps-task-table.model';
import { SystemEventGpsTaskManagerSource } from './system-event-gps-task-manager.source';
import { SystemEventGpsTaskManagerWindow } from './system-event-gps-task-manager.window';

@Component({
  selector: 'ias-system-event-gps-task-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventGpsTaskTableComponent,
    WindowComponent,
    WindowConfirmComponent,
    PictureListComponent,
    SystemEventGpsTaskDetailsContainerComponent,
  ],
  templateUrl: './system-event-gps-task-manager.component.html',
  styleUrl: './system-event-gps-task-manager.component.less',
  providers: [SystemEventGpsTaskManagerSource],
})
export class SystemEventGpsTaskManagerComponent {
  constructor(
    public source: SystemEventGpsTaskManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemEventGpsTaskManagerWindow();
  table = {
    args: new SystemEventGpsTaskTableArgs(),
    load: new EventEmitter<SystemEventGpsTaskTableArgs>(),
  };

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
    details: {
      open: (data: GpsTaskSampleRecord) => {
        this.window.details.data = data;
        let name = '定制场景事件详情';
        if (data.SceneName) {
          name = data.SceneName;
        }
        this.window.details.title = `${name}`;
        this.window.details.show = true;
      },
    },
    picture: {
      data: undefined as GpsTaskSampleRecord | undefined,
      open: (data: Paged<GpsTaskSampleRecord>) => {
        this.on.picture.data = data.Data;
        this.window.picture.set(data.Data, data.Page);
        this.window.picture.show = true;
      },
      change: (page: Page) => {
        if (this.on.picture.data) {
          this.window.picture.set(this.on.picture.data, page);
        }
      },
    },
    video: {
      open: (data: GpsTaskSampleRecord) => {
        if (data.Resources && data.Resources.length > 0) {
          let resource = data.Resources[0];
          if (resource.RecordUrl) {
            this.window.video.src = this.source.src(resource.RecordUrl);
            this.window.video.title = `${data.SceneName}-${resource.ResourceName}`;
            this.window.video.show = true;
          }
        }
      },
      error: (e: Event) => {
        if (!this.window.video.src) return;
        let target = e.currentTarget as HTMLVideoElement;
        let error = target.error;

        if (error) {
          let message = '视频加载失败';

          console.error(target.src, error);
          this.toastr.error(error.message, message);
        }
      },
    },
  };
}
