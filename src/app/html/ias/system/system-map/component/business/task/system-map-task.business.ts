import { Injectable } from '@angular/core';
import { TaskCompareType } from '../../../system-map-task/system-map-task-manager/system-map-task-manager.model';

import { SystemMapTaskBaseBusiness } from './system-map-task-base.business';
import { SystemMapTaskCompareBusiness } from './system-map-task-compare.business';
import { SystemMapTaskRegistrationBusiness } from './system-map-task-registration.business';
import {
  SystemMapTaskArgs,
  SystemMapTaskFilter,
} from './system-map-task.model';

@Injectable()
export class SystemMapTaskBusiness {
  constructor(
    public base: SystemMapTaskBaseBusiness,
    public compare: SystemMapTaskCompareBusiness,
    public registration: SystemMapTaskRegistrationBusiness
  ) {}

  load(args: SystemMapTaskArgs) {
    let filter = SystemMapTaskFilter.from(args);
    switch (args.type) {
      case TaskCompareType.base:
        return this.base.load(filter);
      case TaskCompareType.registration:
        return this.registration.load(filter);
      default:
        return this.compare.load(filter);
    }
  }
}
