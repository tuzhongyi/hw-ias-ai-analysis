import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class SystemEventTaskHandleBusiness {
  constructor(public medium: MediumRequestService) {}
}
