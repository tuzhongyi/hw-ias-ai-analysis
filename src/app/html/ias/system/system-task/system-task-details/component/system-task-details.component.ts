import { Component, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadControlFileInfo } from '../../../../../../common/components/upload-control/upload-control.model';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';

import { FileProgress } from '../../system-task-manager/system-task-manager.model';
import { TaskProgress } from '../../system-task-table/system-task-table.model';
import { SystemTaskDetailsFileTableComponent } from '../system-task-details-file-table/system-task-details-file-table.component';
import { SystemTaskDetailsInfoComponent } from '../system-task-details-info/system-task-details-info.component';

@Component({
  selector: 'ias-system-task-details',
  imports: [
    ContentHeaderComponent,
    SystemTaskDetailsInfoComponent,
    SystemTaskDetailsFileTableComponent,
  ],
  templateUrl: './system-task-details.component.html',
  styleUrl: './system-task-details.component.less',
})
export class SystemTaskDetailsComponent {
  @Input() data?: AnalysisTask;
  @Input() files: UploadControlFileInfo[] = [];
  @Input() fileprogress?: EventEmitter<FileProgress>;
  @Input() taskprogress?: EventEmitter<TaskProgress>;

  constructor(private toastr: ToastrService) {}

  onerror(e: Error) {
    this.toastr.error(e.message);
  }
}
