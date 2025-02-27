import { Injectable } from '@angular/core';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementRecordFileTableBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load() {
    let datas = await this.service.file.array();
    return datas.sort((a, b) => {
      if (a.IsDirectory === b.IsDirectory) {
        return 0;
      }
      return a.IsDirectory < b.IsDirectory ? 1 : -1;
    });
  }

  async folder(data: FileInfo | string) {
    if (typeof data === 'string') {
      return this.service.file.folder(data);
    }
    if (data.IsDirectory) {
      return this.service.file.folder(data.FileName);
    }
    return [];
  }

  file(data: FileInfo) {
    return this.service.file.path(data.FileName);
  }
}
