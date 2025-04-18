import { EventEmitter, Injectable } from '@angular/core';
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { FileProgress } from '../system-task-manager.model';

@Injectable()
export class SystemTaskManagerFileBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async upload(file: UploadControlFile, progress: EventEmitter<FileProgress>) {
    let data = this.convert(file);
    return this.service.file.upload(data, (value: number) => {
      let args = { filename: file.filename, progress: value };
      progress.emit(args);
    });
  }

  private convert(file: UploadControlFile): FormData {
    let form = document.createElement('form') as HTMLFormElement;
    form.name = file.filename;
    let data = new FormData(form);
    let blob = new Blob([file.data as ArrayBuffer], {
      type: 'video/x-matroska',
    });
    data.append('file', blob, file.filename);
    return data;
  }
}
