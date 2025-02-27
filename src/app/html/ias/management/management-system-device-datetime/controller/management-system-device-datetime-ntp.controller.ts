import { Injectable } from '@angular/core';
import { NTPServer } from '../../../../../common/data-core/models/arm/ntp-server.model';

@Injectable()
export class ManagementSystemDeviceDatetimeNTPController {
  constructor() {
    this.data.SynchronizeInterval = 60;
  }
  data = new NTPServer();
}
