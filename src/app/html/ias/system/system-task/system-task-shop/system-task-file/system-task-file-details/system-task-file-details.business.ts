import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemTaskFileDetailsBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async path(path: string) {
    return this.service.file.path(path);
  }
}
