import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../common/data-core/models/arm/gis-point.model';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { SystemMapShopArgs } from './system-map.model';

@Injectable()
export class SystemMapBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(args: SystemMapShopArgs) {
    return this.data(args);
  }

  data(args: SystemMapShopArgs) {
    let params = new GetShopsParams();
    if (args.radius) {
      params.Location = GisPoint.create(
        args.radius.center.X,
        args.radius.center.Y
      );
      params.LocationDistance = args.radius.distance;
    }
    params.Name = args.filter.name;
    if (args.filter.state != undefined) {
      params.ObjectStates = [args.filter.state];
    }
    return this.service.shop.all(params);
  }

  async one() {
    let params = new GetShopsParams();
    params.PageSize = 1;
    params.PageIndex = 1;
    let paged = await this.service.shop.list(params);
    if (paged && paged.Data && paged.Data.length > 0) {
      return paged.Data[0];
    }
    return undefined;
  }
}
