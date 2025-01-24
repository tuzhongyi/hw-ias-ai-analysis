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
    if (args.dsitance.enabled) {
      params.Location = GisPoint.create(
        args.dsitance.center.X,
        args.dsitance.center.Y
      );
      params.LocationDistance = args.dsitance.distance;
    }
    if (args.filter) {
      params.Name = args.filter.name;
      params.Telphone = args.filter.telphone;
      if (args.filter.type) {
        params.ShopTypes = [args.filter.type];
      }
      if (args.filter.camera) {
        params.CameraNos = [args.filter.camera];
      }
      if (args.filter.label) {
        params.ResultLabelTypes = [args.filter.label];
      }
      if (args.filter.state) {
        params.ObjectStates = [args.filter.state];
      }

      params.ObjectStates;
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
