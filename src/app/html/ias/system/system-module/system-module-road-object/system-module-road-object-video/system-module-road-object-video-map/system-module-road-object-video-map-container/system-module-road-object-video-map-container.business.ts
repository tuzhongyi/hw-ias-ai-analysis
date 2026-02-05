import { Injectable } from '@angular/core';
import {
  ParseGpsItemParams,
  ParseTagItemParams,
} from '../../../../../../../../common/data-core/requests/services/system/file/system-file.param';
import { ArmSystemRequestService } from '../../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleRoadObjectVideoMapBusiness {
  constructor(private service: ArmSystemRequestService) {}

  gps(filename: string, rectified: boolean) {
    let params = new ParseGpsItemParams();
    params.FileName = filename;
    params.Rectified = rectified;
    return this.service.file.gps(params);
  }
  tags(filename: string) {
    let params = new ParseTagItemParams();
    params.FileName = filename;
    return this.service.file.tags(params);
  }
}
