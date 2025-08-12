import { EventEmitter, Injectable } from '@angular/core';
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { FileProgress } from '../system-task-manager.model';

@Injectable()
export class SystemTaskManagerFileBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async upload(file: UploadControlFile, progress: EventEmitter<FileProgress>) {
    return this.service.file.upload(file, (value: number) => {
      let args = { filename: file.filename, progress: value };
      progress.emit(args);
    });
  }
}
