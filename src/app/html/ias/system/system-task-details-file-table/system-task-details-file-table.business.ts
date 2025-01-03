import { Injectable } from '@angular/core';
import { UploadControlFileInfo } from '../../../../common/components/upload-control/upload-control.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';
import { ArrayTool } from '../../../../common/tools/array-tool/array.tool';
import { SystemTaskDetailsFileConverter } from './system-task-details-file-table.converter';

@Injectable()
export class SystemTaskDetailsFileBusiness {
  constructor(
    private service: ArmSystemRequestService,
    private converter: SystemTaskDetailsFileConverter
  ) {}

  async load(datas: UploadControlFileInfo[]) {
    let models = datas.map((x) => this.converter.convert(x));
    return models;
  }

  private async data(datas: UploadControlFileInfo[]) {
    let folders = datas
      .map((x) => x.filename)
      .filter((x) => this.folder.is(x))
      .map((x) => this.folder.get(x));
    if (folders.length === 0) return datas;

    folders = ArrayTool.distinct(folders);

    let files = [];
    for (let i = 0; i < folders.length; i++) {
      files.push(...(await this.service.file.folder(folders[i])));
    }

    let filenames = datas.map((x) => this.file.get(x.filename));
    files = files.filter((x) => {
      let filename = this.file.get(x.FileName);
      return filenames.includes(filename);
    });
    return files;
  }

  file = {
    get: (path: string) => {
      let index = path.lastIndexOf('/');
      if (index < 0) {
        return name;
      }
      return path.substring(index + 1);
    },
  };
  folder = {
    is: (path: string) => {
      return path.indexOf('/') >= 0;
    },
    get: (path: string) => {
      let index = path.indexOf('/');
      return path.substring(0, index);
    },
  };
}
