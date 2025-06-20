import { Injectable } from '@angular/core';
import { SystemTaskRouteMapPathBusiness } from './system-task-route-map-path.business';
import { SystemTaskRouteMapRoadBusiness } from './system-task-route-map-road.business';

@Injectable()
export class SystemTaskRouteMapBusiness {
  constructor(
    public road: SystemTaskRouteMapRoadBusiness,
    public path: SystemTaskRouteMapPathBusiness
  ) {}
}
