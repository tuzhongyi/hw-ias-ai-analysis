import { Injectable } from '@angular/core';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';

@Injectable()
export class SystemTaskFileTableBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(paths: string[]) {
    let datas = await this.data(paths);
    return datas;
  }

  path(data: FileInfo) {
    return this.service.file.path(data.FileName);
  }

  private async data(paths: string[]) {
    let folders = paths
      .filter((x) => this.folder.is(x))
      .map((x) => this.folder.get(x));

    folders = ArrayTool.distinct(folders);

    let files = [];
    for (let i = 0; i < folders.length; i++) {
      files.push(...(await this.service.file.folder(folders[i])));
    }

    let filenames = paths.map((x) => this.file.get(x));
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
      let index = path.lastIndexOf('/');
      return path.substring(0, index);
    },
  };
}
