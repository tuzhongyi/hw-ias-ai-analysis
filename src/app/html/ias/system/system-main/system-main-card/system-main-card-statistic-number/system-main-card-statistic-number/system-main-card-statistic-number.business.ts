import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskListParams } from '../../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/road-object/geographic-road-object.params';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { GetMobileDevicesParams } from '../../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { SystemMainCardStatisticNumberItem } from '../system-main-card-statistic-number-item/system-main-card-statistic-number-item.model';

@Injectable()
export class SystemMainCardStatisticNumberBusiness {
  constructor(
    system: ArmSystemRequestService,
    analysis: ArmAnalysisRequestService,
    geo: ArmGeographicRequestService
  ) {
    this.service = { system, analysis, geo };
  }
  private service: {
    system: ArmSystemRequestService;
    analysis: ArmAnalysisRequestService;
    geo: ArmGeographicRequestService;
  };

  async shop() {
    let page = await this.data.shop();
    let item: SystemMainCardStatisticNumberItem = {
      icon: 'shop',
      name: '商铺',
      value: page.TotalRecordCount,
    };
    return item;
  }

  async road() {
    let page = await this.data.road();
    let item: SystemMainCardStatisticNumberItem = {
      icon: 'road',
      name: '道路',
      value: page.TotalRecordCount,
    };
    return item;
  }
  async device() {
    let page = await this.data.device();
    let item: SystemMainCardStatisticNumberItem = {
      icon: 'device',
      name: '巡逻车',
      value: page.TotalRecordCount,
    };
    return item;
  }
  async task() {
    let page = await this.data.task();
    let item: SystemMainCardStatisticNumberItem = {
      icon: 'task',
      name: '定制场景',
      value: page.TotalRecordCount,
    };
    return item;
  }
  async roadobject() {
    let page = await this.data.roadobject();
    let item: SystemMainCardStatisticNumberItem = {
      icon: 'roadobject',
      name: '道路物件',
      value: page.TotalRecordCount,
    };
    return item;
  }

  private data = {
    shop: async () => {
      let params = new GetShopRegistrationsParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      let paged = await this.service.geo.shop.list(params);
      return paged.Page;
    },
    road: async () => {
      let params = new GetShopRegistrationsParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      let paged = await this.service.geo.road.list(params);
      return paged.Page;
    },
    device: async () => {
      let params = new GetMobileDevicesParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      let paged = await this.service.system.mobile.device.list(params);
      return paged.Page;
    },
    task: async () => {
      let params = new GetAnalysisGpsTaskListParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      let paged = await this.service.analysis.llm.gps.task.list(params);
      return paged.Page;
    },
    roadobject: async () => {
      let params = new GetRoadObjectsParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      let paged = await this.service.geo.road.object.list(params);
      return paged.Page;
    },
  };
}
