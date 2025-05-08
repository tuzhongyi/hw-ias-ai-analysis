import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadControlComponent } from '../../../../../../common/components/upload-control/upload-control.component';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';

import { SystemTaskCreationFileTableComponent } from '../system-task-creation-file-table/system-task-creation-file-table.component';
import { SystemTaskCreationFileController } from './controller/system-task-creation-file.controller';
import { SystemTaskCreationSourceController } from './controller/system-task-creation-source.controller';
import { SystemTaskCreationController } from './controller/system-task-creation.controller';
import { SystemTaskCreationBusiness } from './system-task-creation.business';
import { SystemTaskModel } from './system-task-creation.model';

@Component({
  selector: 'ias-system-task-creation',
  imports: [
    CommonModule,
    FormsModule,
    SystemTaskCreationFileTableComponent,
    UploadControlComponent,
  ],
  templateUrl: './system-task-creation.component.html',
  styleUrl: './system-task-creation.component.less',
  providers: [
    SystemTaskCreationSourceController,
    SystemTaskCreationFileController,
    SystemTaskCreationController,
    SystemTaskCreationBusiness,
  ],
})
export class SystemTaskCreationComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() ok = new EventEmitter<SystemTaskModel>();

  constructor(
    private business: SystemTaskCreationBusiness,
    public controller: SystemTaskCreationController,
    private toastr: ToastrService
  ) {}

  task = new AnalysisTask();

  ngOnInit(): void {
    this.controller.source.types.then((x) => {
      if (x.length > 0) {
        this.task.TaskType = x[0].Value;
      }
    });
    this.task.SourceType = 0;
  }

  get check() {
    if (!this.task.Name) {
      this.toastr.warning('任务名称不能为空');
      return false;
    }
    if (this.controller.file.files.length === 0) {
      this.toastr.warning('请上传文件');
      return false;
    }
    if (
      this.controller.file.files.length !== this.controller.file.datas.length
    ) {
      this.toastr.warning('请等待文件加载');
      return false;
    }
    return true;
  }

  onok() {
    if (this.check) {
      this.task.Files = this.controller.file.datas.map((x) => x.filename);
      this.business
        .create(this.task)
        .then((x) => {
          this.ok.emit({
            task: x,
            files: this.controller.file.files,
          });
        })
        .catch((e) => {
          this.toastr.error('操作失败');
        });
    }
  }

  oncancel() {
    this.close.emit();
  }
}
