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
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemTaskFileDetailsComponent } from '../../../system-task/system-task-shop/system-task-file/system-task-file-details/system-task-file-details.component';
import { SystemModuleFileTableComponent } from '../system-module-file-table/system-module-file-table.component';
import { SystemModuleFileUploadManagerComponent } from '../system-module-file-upload/system-module-file-upload-manager/system-module-file-upload-manager.component';
import { SystemModuleFileUploadProgressManagerComponent } from '../system-module-file-upload/system-module-file-upload-progress-manager/system-module-file-upload-progress-manager.component';
import { SystemMobuleFileManagerBusiness } from './system-module-file-manager.business';
import { SystemMobuleFileManagerWindow } from './system-module-file-manager.window';

@Component({
  selector: 'ias-system-module-file-manager',
  imports: [
    CommonModule,
    WindowComponent,
    SystemModuleFileTableComponent,
    SystemTaskFileDetailsComponent,
    SystemModuleFileUploadManagerComponent,
    SystemModuleFileUploadProgressManagerComponent,
  ],
  templateUrl: './system-module-file-manager.component.html',
  styleUrl: './system-module-file-manager.component.less',
  providers: [SystemMobuleFileManagerBusiness],
})
export class SystemModuleFileManagerComponent implements OnInit, OnDestroy {
  @Input() iswindow = false;
  @Input() selected?: FileInfo;
  @Output() selectedChange = new EventEmitter<FileInfo>();
  @Input() multiple?: EventEmitter<void>;
  constructor(
    private business: SystemMobuleFileManagerBusiness,
    private toastr: ToastrService
  ) {}

  window = new SystemMobuleFileManagerWindow();
  private subscription = new Subscription();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    select: (data: FileInfo) => {
      this.selected = data;
      this.selectedChange.emit(this.selected);
    },
    video: (data: FileInfo) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
    error: (e: Error) => {
      this.toastr.error(e.message);
    },
    upload: (files: UploadControlFile[]) => {
      this.window.progress.open(files);
      this.window.upload.show = false;
    },
  };
}
