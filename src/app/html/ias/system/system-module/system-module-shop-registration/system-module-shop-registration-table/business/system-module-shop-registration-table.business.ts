import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import {
  SystemModuleShopRegistrationTableFilter,
  SystemModuleShopRegistrationTableItem,
} from '../system-module-shop-registration-table.model';
import { SystemModuleShopRegistrationTableConverter } from './system-module-shop-registration-table.converter';

@Injectable()
export class SystemModuleShopRegistrationTableBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private converter: SystemModuleShopRegistrationTableConverter
  ) {}

  async load(
    index: number,
    size: number,
    filter: SystemModuleShopRegistrationTableFilter
  ): Promise<PagedList<SystemModuleShopRegistrationTableItem>> {
    let datas = await this.data.load(index, size, filter);

    if (
      datas.Page.PageCount > 0 &&
      datas.Page.PageIndex > datas.Page.PageCount
    ) {
      return this.load(datas.Page.PageCount, datas.Page.PageSize, filter);
    }

    let paged = new PagedList<SystemModuleShopRegistrationTableItem>();
    paged.Page = datas.Page;
    paged.Data = [];
    for (let i = 0; i < datas.Data.length; i++) {
      const data = datas.Data[i];
      let item = await this.converter.convert(data);
      paged.Data.push(item);
    }
    return paged;
  }

  get(index: number, filter: SystemModuleShopRegistrationTableFilter) {
    return this.data.load(index, 1, filter);
  }

  private data = {
    load: (
      index: number,
      size: number,
      filter: SystemModuleShopRegistrationTableFilter
    ) => {
      let params = new GetShopRegistrationsParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.Asc = filter.asc;
      params.Desc = filter.desc;
      if (filter.name) {
        params.Name = filter.name;
      }
      if (filter.telphone) {
        params.Telphone = filter.telphone;
      }
      if (filter.road.on && filter.road.on.length > 0) {
        params.RoadIds = filter.road.on.map((x) => x.Id);
      }
      if (filter.road.ori && filter.road.ori.length > 0) {
        params.OriRoadIds = filter.road.ori.map((x) => x.Id);
      }
      if (filter.states && filter.states.length > 0) {
        params.ObjectStates = filter.states;
      }

      if (filter.point) {
        params.Location = filter.point.location;
        params.LocationDistance = filter.point.distance;
      }

      return this.service.shop.list(params);
    },
  };
}
