import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class SystemEventGpsTaskDetailsContainerBusiness {
  constructor(private medium: MediumRequestService) {}

  video = {
    src: (url: string) => {
      return this.medium.record(url);
    },
  };
}
