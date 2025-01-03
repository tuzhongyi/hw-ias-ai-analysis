import { Injectable } from '@angular/core';
import { ParseGpsItemParams } from '../../../../common/data-core/requests/services/system/file/system-file.param';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemTaskFileDetailsMapBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(filename: string) {
    let params = new ParseGpsItemParams();
    params.FileName = filename;
    return this.service.file.gps(params);
  }
}
