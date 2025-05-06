import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class SystemEventDetailsHandleBusiness {
  constructor(public medium: MediumRequestService) {}
}
