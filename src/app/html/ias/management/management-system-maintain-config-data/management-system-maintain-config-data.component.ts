import { Component, EventEmitter, Output } from '@angular/core';
import { UploadControlComponent } from '../../../../common/components/upload-control/upload-control.component';
import {
  FileReadType,
  UploadControlFile,
  UploadControlFileInfo,
} from '../../../../common/components/upload-control/upload-control.model';
import { ManagementSystemMaintainConfigDataBusiness } from './management-system-maintain-config-data.business';

@Component({
  selector: 'ias-management-system-maintain-config-data',
  imports: [UploadControlComponent],
  templateUrl: './management-system-maintain-config-data.component.html',
  styleUrl: './management-system-maintain-config-data.component.less',
  providers: [ManagementSystemMaintainConfigDataBusiness],
})
export class ManagementSystemMaintainConfigDataComponent {
  @Output() upload = new EventEmitter<ArrayBuffer>();
  constructor(private business: ManagementSystemMaintainConfigDataBusiness) {}

  file?: ArrayBuffer;
  type = FileReadType.ArrayBuffer;
  filename = '';

  ondownload() {
    this.business.download();
  }

  onstart(info: UploadControlFileInfo) {
    this.filename = info.filename;
  }
  onfile(file: UploadControlFile) {
    this.file = file.data as ArrayBuffer;
  }

  onupload() {
    if (this.file) {
      this.upload.emit(this.file);
    }
  }
}
