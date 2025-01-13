import { Injectable } from '@angular/core';
import { UploadControlFileInfo } from '../../../../common/components/upload-control/upload-control.model';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { SystemTaskDetailsFileModel } from './system-task-details-file-table.model';

@Injectable()
export class SystemTaskDetailsFileConverter {
  convert(source: UploadControlFileInfo | FileInfo) {
    if (source instanceof FileInfo) {
      return this.FileInfo(source);
    }
    return this.UploadControlFileInfo(source);
  }

  private UploadControlFileInfo(source: UploadControlFileInfo) {
    let model = new SystemTaskDetailsFileModel();
    model.filename = source.filename;
    model.size = source.size;
    model.progress = source.completed ? 100 : 0;
    return model;
  }

  private FileInfo(source: FileInfo) {
    let model = new SystemTaskDetailsFileModel();
    model.filename = source.FileName;
    model.size = source.FileSize;
    model.progress = 100;
    return model;
  }
}
