import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { WindowComponent } from '../../../../../share/window/window.component';
import { SystemTaskFileDetailsMultipleComponent } from '../system-task-file-details-multiple/system-task-file-details-multiple.component';
import { SystemTaskFileDetailsComponent } from '../system-task-file-details/system-task-file-details.component';
import { SystemTaskFileTableComponent } from '../system-task-file-table/system-task-file-table.component';
import { SystemTaskFileManagerBusiness } from './system-task-file-manager.business';
import { SystemTaskFileManagerWindow } from './system-task-file-manager.window';
@Component({
  selector: 'ias-system-task-file-manager',
  imports: [
    CommonModule,
    SystemTaskFileTableComponent,
    SystemTaskFileDetailsComponent,
    WindowComponent,
    SystemTaskFileDetailsMultipleComponent,
  ],
  templateUrl: './system-task-file-manager.component.html',
  styleUrl: './system-task-file-manager.component.less',
  providers: [SystemTaskFileManagerBusiness],
})
export class SystemTaskFileManagerComponent implements OnInit, OnDestroy {
  @Input() iswindow = false;
  @Input() task?: AnalysisTask;
  @Input() selecteds: FileInfo[] = [];
  @Output() selectedsChange = new EventEmitter<FileInfo[]>();
  @Input() multiple?: EventEmitter<void>;
  constructor(
    private business: SystemTaskFileManagerBusiness,
    private toastr: ToastrService
  ) {}

  window = new SystemTaskFileManagerWindow();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (!this.task) {
      this.load();
    }
    if (this.multiple) {
      let sub = this.multiple.subscribe((x) => {
        this.on.multiple();
      });
      this.subscription.add(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  on = {
    select: (datas: FileInfo[]) => {
      this.selecteds = datas;
      this.selectedsChange.emit(this.selecteds);
    },
    video: (data: FileInfo) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
    error: (e: Error) => {
      this.toastr.error(e.message);
    },
    multiple: () => {
      this.window.multiple.title = this.selecteds
        .map((x) => x.FileName)
        .join('-');
      this.window.multiple.show = true;
    },
  };
}
