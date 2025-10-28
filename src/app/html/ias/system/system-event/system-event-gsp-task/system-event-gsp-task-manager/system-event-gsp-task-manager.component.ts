import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemEventGspTaskDetailsContainerComponent } from '../system-event-gsp-task-details/system-event-gsp-task-details-container/system-event-gsp-task-details-container.component';
import { SystemEventGspTaskTableComponent } from '../system-event-gsp-task-table/system-event-gsp-task-table.component';
import { SystemEventGspTaskTableArgs } from '../system-event-gsp-task-table/system-event-gsp-task-table.model';
import { SystemEventGspTaskManagerSource } from './system-event-gsp-task-manager.source';
import { SystemEventGspTaskManagerWindow } from './system-event-gsp-task-manager.window';

@Component({
  selector: 'ias-system-event-gsp-task-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventGspTaskTableComponent,
    WindowComponent,
    WindowConfirmComponent,
    PictureListComponent,
    SystemEventGspTaskDetailsContainerComponent,
  ],
  templateUrl: './system-event-gsp-task-manager.component.html',
  styleUrl: './system-event-gsp-task-manager.component.less',
  providers: [SystemEventGspTaskManagerSource],
})
export class SystemEventGspTaskManagerComponent {
  constructor(
    public source: SystemEventGspTaskManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemEventGspTaskManagerWindow();
  table = {
    args: new SystemEventGspTaskTableArgs(),
    load: new EventEmitter<SystemEventGspTaskTableArgs>(),
  };

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
    details: {
      open: (data: GpsTaskSampleRecord) => {
        this.window.details.data = data;
        let name = '定制场景事件';
        if (data.SceneName) {
          name = data.SceneName;
        }
        this.window.details.title = `${name}-${formatDate(
          data.Time,
          Language.YearMonthDayHHmmss,
          'en'
        )}`;
        this.window.details.show = true;
      },
    },
    video: {
      open: (data: GpsTaskSampleRecord) => {
        if (data.Resources && data.Resources.length > 0) {
          let resource = data.Resources[0];
          if (resource.RecordUrl) {
            this.window.video.src = this.source.src(resource.RecordUrl);
            this.window.video.title = resource.ResourceName;
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
