import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class PictureBusiness {
  constructor(private medium: MediumRequestService) {}

  load(id: string) {
    return this.medium.picture(id);
  }
}
