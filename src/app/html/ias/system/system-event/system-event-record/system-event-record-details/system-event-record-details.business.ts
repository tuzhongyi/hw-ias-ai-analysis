import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class SystemEventRecordDetailsBusiness {
  constructor(private service: MediumRequestService) {}
  picture(id: string) {
    return this.service.picture(id);
  }
}
