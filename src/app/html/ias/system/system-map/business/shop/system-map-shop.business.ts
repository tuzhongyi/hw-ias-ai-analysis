import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { SystemMapDistanceArgs } from '../../system-map.model';
import { SystemMapShopArgs } from '../system-map-shop.model';
import { SystemMapShopTaskBusiness } from './task/system-map-shop-task.business';

@Injectable()
export class SystemMapShopBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private task: SystemMapShopTaskBusiness
  ) {}

  async load(args: SystemMapShopArgs, distance: SystemMapDistanceArgs) {
    if (args.task) {
      return this.task.load(args.task, args);
    }
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
    if (args.type || args.type === 0) {
      params.ShopTypes = [args.type];
    }
    if (args.camera) {
      params.CameraNos = [args.camera];
    }
    if (args.label || args.label === 0) {
      params.ResultLabelTypes = [args.label];
    }
    if (args.state || args.state === 0) {
      params.ObjectStates = [args.state];
    }
    return this.service.shop.all(params);
  }
}
