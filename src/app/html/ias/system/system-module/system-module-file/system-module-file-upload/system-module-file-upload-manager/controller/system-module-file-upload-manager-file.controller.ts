import { EventEmitter } from '@angular/core';
import {
  FileReadType,
  UploadControlFile,
  UploadControlFileInfo,
} from '../../../../../../../../common/components/upload-control/upload-control.model';
import { SystemModuleFile } from '../../system-module-file-upload-table/system-module-file-upload-table.model';

export class SystemModuleFileUploadManagerFileController {
  accept = 'video/*,.mkv';
  type = FileReadType.ArrayBuffer;

  load = new EventEmitter<SystemModuleFile[]>();

  datas: SystemModuleFile[] = [];
  selecteds: SystemModuleFile[] = [];
  files: UploadControlFile[] = [];

  onstart(info: UploadControlFileInfo) {
    let model = new SystemModuleFile();
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
