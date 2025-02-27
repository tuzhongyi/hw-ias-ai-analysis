import { Injectable } from '@angular/core';
import { ManagementSystemDeviceDatetimeLocalController } from './management-system-device-datetime-local.controller';
import { ManagementSystemDeviceDatetimeNTPController } from './management-system-device-datetime-ntp.controller';

@Injectable()
export class ManagementSystemDeviceDatetimeController {
  constructor(
    public ntp: ManagementSystemDeviceDatetimeNTPController,
    public local: ManagementSystemDeviceDatetimeLocalController
  ) {}
}
