import { Injectable } from '@angular/core';
import { ManagementSystemDeviceDatetimeNTPSource } from './management-system-device-datetime-ntp.source';

@Injectable()
export class ManagementSystemDeviceDatetimeSource {
  constructor(public ntp: ManagementSystemDeviceDatetimeNTPSource) {}
}
