import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadControlComponent } from '../../../../../../../common/components/upload-control/upload-control.component';
import { UploadControlFile } from '../../../../../../../common/components/upload-control/upload-control.model';
import { SystemModuleFileUploadTableComponent } from '../system-module-file-upload-table/system-module-file-upload-table.component';
import { SystemModuleFileUploadManagerController } from './controller/system-module-file-upload-manager.controller';

@Component({
  selector: 'ias-system-module-file-upload-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleFileUploadTableComponent,
    UploadControlComponent,
  ],
  templateUrl: './system-module-file-upload-manager.component.html',
  styleUrl: './system-module-file-upload-manager.component.less',
})
export class SystemModuleFileUploadManagerComponent implements OnChanges {
  @Output() close = new EventEmitter();
  @Output() upload = new EventEmitter<UploadControlFile[]>();

  controller = new SystemModuleFileUploadManagerController();

  constructor(private toastr: ToastrService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  get check() {
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

  on = {
    ok: () => {
      if (this.check) {
        this.upload.emit(this.controller.file.files);
      }
    },
    close: () => {
      this.close.emit();
    },
  };
}
