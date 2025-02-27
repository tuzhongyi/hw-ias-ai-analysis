import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../../common/data-core/requests/services/geographic/road/geographic-road.params';
import { SystemMapDistanceArgs } from '../system-map.model';
import { SystemMapRoadArgs } from './system-map-road.model';

@Injectable()
export class SystemMapRoadBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(args: SystemMapRoadArgs, distance: SystemMapDistanceArgs) {
    return this.data(args, distance);
  }

  private data(args: SystemMapRoadArgs, distance: SystemMapDistanceArgs) {
    let params = new GetRoadsParams();
    params.Name = args.name;
    if (distance.enabled) {
      params.MaxDistance = distance.distance;
      params.GeoPoint = GisPoint.create(distance.center.X, distance.center.Y);
    }
    return this.service.road.all(params);
  }
}
