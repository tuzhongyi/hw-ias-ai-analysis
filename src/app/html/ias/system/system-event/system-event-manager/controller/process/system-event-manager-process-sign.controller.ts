import { Injectable } from '@angular/core';
import { SystemEventManagerProcessSignDisappearController } from './system-event-manager-process-sign-disappear.controller';
import { SystemEventManagerProcessSignDiscoverController } from './system-event-manager-process-sign-discover.controller';

@Injectable()
export class SystemEventManagerProcessSignController {
  constructor(
    public discover: SystemEventManagerProcessSignDiscoverController,
    public disappear: SystemEventManagerProcessSignDisappearController
  ) {}
}
