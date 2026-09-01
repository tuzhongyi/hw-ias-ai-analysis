import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemEventProcessHandlingBusiness {
  constructor(private service: ArmSystemRequestService) {}
}
