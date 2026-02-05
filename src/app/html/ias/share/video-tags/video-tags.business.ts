import { Injectable } from '@angular/core';
import { ParseTagItemParams } from '../../../../common/data-core/requests/services/system/file/system-file.param';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class VideoTagsBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async path(path: string) {
    return this.service.file.path(path);
  }

  tags(filename: string) {
    let params = new ParseTagItemParams();
    params.FileName = filename;
    return this.service.file.tags(params);
  }
}
