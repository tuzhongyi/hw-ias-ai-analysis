import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { SystemMapDistanceArgs } from '../system-map.model';
import { SystemMapShopArgs } from './system-map-shop.model';

@Injectable()
export class SystemMapShopBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(args: SystemMapShopArgs, distance: SystemMapDistanceArgs) {
    return this.data(args, distance);
  }

  data(args: SystemMapShopArgs, distance: SystemMapDistanceArgs) {
    let params = new GetShopsParams();
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
    if (args.type) {
      params.ShopTypes = [args.type];
    }
    if (args.camera) {
      params.CameraNos = [args.camera];
    }
    if (args.label) {
      params.ResultLabelTypes = [args.label];
    }
    if (args.state) {
      params.ObjectStates = [args.state];
    }

    params.ObjectStates;

    return this.service.shop.all(params);
  }
}
