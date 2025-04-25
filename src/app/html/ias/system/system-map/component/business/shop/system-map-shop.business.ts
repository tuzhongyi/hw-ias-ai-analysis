import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { SystemMapDistanceArgs } from '../../system-map.model';
import { SystemMapShopArgs } from './system-map-shop.model';

@Injectable()
export class SystemMapShopBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load(args: SystemMapShopArgs, distance: SystemMapDistanceArgs) {
    return this.data(args, distance);
  }

  data(args: SystemMapShopArgs, distance: SystemMapDistanceArgs) {
    let params = new GetShopRegistrationsParams();
    if (distance.enabled) {
      params.Location = GisPoint.create(distance.center.X, distance.center.Y);
      params.LocationDistance = distance.distance;
    }

    if (args.name) {
      params.Name = args.name;
    }
    if (args.telphone) {
      params.Telphone = args.telphone;
    }
    if (args.state || args.state === 0) {
      params.ObjectStates = [args.state];
    }
    return this.service.shop.all(params);
  }
}
