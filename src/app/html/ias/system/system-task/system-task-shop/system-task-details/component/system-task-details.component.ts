import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { UploadControlFileInfo } from '../../../../../../../common/components/upload-control/upload-control.model';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { TaskCompletedArgs } from '../../system-task-creation/component/system-task-creation.model';
import { FileProgress } from '../../system-task-manager/system-task-manager.model';
import { TaskProgress } from '../../system-task-table/system-task-table.model';
import { SystemTaskDetailsFileTableComponent } from '../system-task-details-file-table/system-task-details-file-table.component';
import { SystemTaskDetailsInfoComponent } from '../system-task-details-info/system-task-details-info.component';

@Component({
  selector: 'ias-system-task-details',
  imports: [
    CommonModule,
    SystemTaskDetailsInfoComponent,
    SystemTaskDetailsFileTableComponent,
  ],
  templateUrl: './system-task-details.component.html',
  styleUrl: './system-task-details.component.less',
})
export class SystemTaskDetailsComponent implements OnInit {
  @Input() data?: AnalysisTask;
  @Input() files: UploadControlFileInfo[] = [];
  @Input() fileprogress?: EventEmitter<FileProgress>;
  @Input() taskprogress?: EventEmitter<TaskProgress>;
  @Output() analysis = new EventEmitter<TaskCompletedArgs>();
  @Output() close = new EventEmitter<AnalysisTask>();

  constructor(private toastr: ToastrService) {}

  completed = false;

  ngOnInit(): void {
    let completed = this.files.filter((x) => x.completed);
    this.completed = completed.length === this.files.length;
  }

  on = {
    error: (e: Error) => {
      this.toastr.error(e.message);
    },
    completed: () => {
      this.completed = true;
    },
    analysis: () => {
      if (this.data) {
        let args: TaskCompletedArgs = {
          task: this.data,
          files: this.files.map((x) => x.filename),
          start: true,
        };
        this.analysis.emit(args);
      }
    },
    close: () => {
      this.close.emit();
    },
  };
}
