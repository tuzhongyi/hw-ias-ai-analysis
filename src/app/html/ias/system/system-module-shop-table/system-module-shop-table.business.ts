import { Injectable } from '@angular/core';
import { PagedList } from '../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { SystemModuleShopTableConverter } from './system-module-shop-table.converter';
import {
  ShopModel,
  SystemModuleShopTableFilter,
} from './system-module-shop-table.model';

@Injectable()
export class SystemModuleShopTableBusiness {
  constructor(
    private service: ArmAnalysisRequestService,

    private converter: SystemModuleShopTableConverter
  ) {}

  async load(
    index: number,
    size: number,
    args: SystemModuleShopTableFilter,
    full = false
  ) {
    let datas = await this.data(index, size, args);
    if (
      datas.Page.RecordCount == 0 &&
      datas.Page.TotalRecordCount > 0 &&
      datas.Page.PageIndex > 1
    ) {
      datas = await this.data(datas.Page.RecordCount, size, args);
    }

    let paged = new PagedList<ShopModel>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x, i) => {
      let model = this.converter.convert(x);
      model.index = paged.Page.PageSize * (paged.Page.PageIndex - 1) + i + 1;
      return model;
    });
    if (full) {
      let count = paged.Page.PageSize - paged.Page.RecordCount;
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          paged.Data.push(ShopModel.create());
        }
      }
    }

    return paged;
  }

  data(index: number, size: number, args: SystemModuleShopTableFilter) {
    let params = new GetShopsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.Name = args.name;
    params.Telphone = args.telphone;
    params.Marking = args.marking ? undefined : false;
    params.Confidence = args.confidence;
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
    return this.service.shop.list(params);
  }
}
