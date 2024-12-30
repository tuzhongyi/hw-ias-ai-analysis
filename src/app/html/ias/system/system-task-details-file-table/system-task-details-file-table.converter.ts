import { Injectable } from '@angular/core';
import { UploadControlFileInfo } from '../../../../common/components/upload-control/upload-control.model';
import { SystemTaskDetailsFileModel } from './system-task-details-file-table.model';

@Injectable()
export class SystemTaskDetailsFileConverter {
  convert(source: UploadControlFileInfo) {
    let model = new SystemTaskDetailsFileModel();
    model.filename = source.filename;
    model.size = source.size;
    return model;
  }
}
