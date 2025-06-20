import { Injectable } from '@angular/core';
import { SystemTaskRouteStatisticRegistrationBusiness } from './system-task-route-statistic-registration.business';
import { SystemTaskRouteStatisticTaskBusiness } from './system-task-route-statistic-task.business';

@Injectable()
export class SystemTaskRouteStatisticBusiness {
  constructor(
    public task: SystemTaskRouteStatisticTaskBusiness,
    public registration: SystemTaskRouteStatisticRegistrationBusiness
  ) {}
}
