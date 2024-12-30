import { Injectable } from '@angular/core';
import { UploadControlFileInfo } from '../../../../common/components/upload-control/upload-control.model';
import { SystemTaskDetailsFileConverter } from './system-task-details-file-table.converter';

@Injectable()
export class SystemTaskDetailsFileBusiness {
  constructor(private converter: SystemTaskDetailsFileConverter) {}

  load(datas: UploadControlFileInfo[]) {
    return datas.map((x) => this.converter.convert(x));
  }
}
