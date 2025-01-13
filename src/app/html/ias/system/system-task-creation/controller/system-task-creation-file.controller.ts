import { EventEmitter, Injectable } from '@angular/core';
import {
  FileReadType,
  UploadControlFile,
  UploadControlFileInfo,
} from '../../../../../common/components/upload-control/upload-control.model';
import { SystemTaskCreationFileModel } from '../../system-task-creation-file-table/system-task-creation-file-table.model';

@Injectable()
export class SystemTaskCreationFileController {
  accept = 'video/*,.mkv';
  type = FileReadType.ArrayBuffer;

  load = new EventEmitter<SystemTaskCreationFileModel[]>();

  datas: SystemTaskCreationFileModel[] = [];
  selecteds: SystemTaskCreationFileModel[] = [];
  files: UploadControlFile[] = [];

  onstart(info: UploadControlFileInfo) {
    let model = new SystemTaskCreationFileModel();
    model.filename = info.filename;
    model.size = info.size ?? 0;

    let index = this.datas.findIndex((x) => x.equals(model));

    if (index < 0) {
      this.datas.push(model);
      this.load.emit(this.datas);
    }
  }
  onfile(file: UploadControlFile) {
    this.files.push(file);
    let index = this.datas.findIndex((x) => x.filename === file.filename);
    if (index >= 0) {
      this.datas[index].loaded = true;
      this.load.emit(this.datas);
    }
  }

  onremove() {
    this.selecteds.forEach((x) => {
      this.datas.splice(this.datas.indexOf(x), 1);
      this.files.splice(
        this.files.findIndex((y) => y.filename === x.filename),
        1
      );
    });
    this.load.emit(this.datas);
    this.selecteds = [];
  }
}
