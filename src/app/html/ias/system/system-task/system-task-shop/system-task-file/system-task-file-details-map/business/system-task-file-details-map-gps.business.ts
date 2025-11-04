import { Injectable } from '@angular/core';
import { ParseGpsItemParams } from '../../../../../../../../common/data-core/requests/services/system/file/system-file.param';
import { ArmSystemRequestService } from '../../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemTaskFileDetailsMapGPSBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(filename: string, rectified: boolean) {
    let params = new ParseGpsItemParams();
    params.FileName = filename;
    params.Rectified = rectified;
    return this.service.file.gps(params);
  }
}
