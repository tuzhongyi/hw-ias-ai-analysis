import { Injectable } from '@angular/core';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemMobuleFileTableBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(path?: string) {
    let datas: FileInfo[] = [];
    if (path) {
      datas = await this.data(path);
    } else {
      datas = await this.folder.list();
    }
    return datas;
  }

  path(data: FileInfo) {
    return this.service.file.path(data.FileName);
  }

  private async data(path: string) {
    return this.service.file.folder(path);
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
    list: () => {
      return this.service.file.array();
    },
  };
}
