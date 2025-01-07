import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { SystemTaskFileDetailsComponent } from '../system-task-file-details/system-task-file-details.component';
import { SystemTaskFileTableComponent } from '../system-task-file-table/system-task-file-table.component';
import { SystemTaskFileManagerBusiness } from './system-task-file-manager.business';
import { SystemTaskFileManagerWindow } from './system-task-file-manager.window';

@Component({
  selector: 'ias-system-task-file-manager',
  imports: [
    CommonModule,
    ContentHeaderComponent,
    SystemTaskFileTableComponent,
    SystemTaskFileDetailsComponent,
    WindowComponent,
  ],
  templateUrl: './system-task-file-manager.component.html',
  styleUrl: './system-task-file-manager.component.less',
  providers: [SystemTaskFileManagerBusiness],
})
export class SystemTaskFileManagerComponent implements OnInit {
  constructor(
    private business: SystemTaskFileManagerBusiness,
    private toastr: ToastrService
  ) {}

  task?: AnalysisTask;
  window = new SystemTaskFileManagerWindow();

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business
      .get()
      .then((x) => {
        this.task = x;
      })
      .catch((e) => {
        this.toastr.error('加载失败');
      });
  }

  onvideo(data: FileInfo) {
    this.window.details.data = data;
    this.window.details.show = true;
  }
  onerror(e: Error) {
    this.toastr.error(e.message);
  }
}
