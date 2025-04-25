import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { SystemModuleShopTableFilter } from '../../system-module-shop-table.model';
import { SystemModuleShopTableRoadService } from './system-module-shop-table-road.service';

@Injectable()
export class SystemModuleShopTableService {
  constructor(
    private service: ArmAnalysisRequestService,
    private road: SystemModuleShopTableRoadService
  ) {}

  async load(index: number, size: number, args: SystemModuleShopTableFilter) {
    let params = new GetShopsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.Name = args.name;
    params.Telphone = args.telphone;
    params.Marking = args.marking ? undefined : false;
    params.Confidence = args.confidence;
    if (args.count) {
      params.MinTaskCount = args.count;
    }
    if (args.type) {
      params.ShopTypes = [args.type];
    }

    params.ObjectStates =
      0 < args.states.length && args.states.length < 3
        ? args.states
        : undefined;
    params.Asc = args.asc;
    params.Desc = args.desc;
    if (args.type) {
      params.ShopTypes = [args.type];
    }

    if (args.road && args.road.length > 0) {
      params.RoadIds = args.road.map((x) => x.Id);
    }

    return this.service.shop.list(params);
  }
}
