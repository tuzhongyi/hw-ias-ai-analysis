import { Injectable } from '@angular/core';
import { ArmEventTriggerType } from '../../../../../../common/data-core/enums/event/arm-event-trigger-type.enum';
import { ArmEventType } from '../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { EventDataObject } from '../../../../../../common/data-core/models/arm/event/event-data-object.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import {
  GetShopSignsParams,
  GetShopsParams,
} from '../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { GetMobileEventsParams } from '../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemEventTableFilter } from './system-event-table.model';

@Injectable()
export class SystemEventTableService {
  constructor(
    private service: ArmSystemRequestService,
    private analysis: ArmAnalysisRequestService
  ) {}

  async load(
    index: number,
    size: number,
    filter: SystemEventTableFilter
  ): Promise<PagedList<MobileEventRecord>> {
    let params = new GetMobileEventsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = filter.duration.begin;
    params.EndTime = filter.duration.end;

    if (filter.resource) {
      params.ResourceName = filter.resource;
    }

    if (filter.type) {
      params.EventType = filter.type;
    }
    if (filter.types && filter.types.length > 0) {
      params.EventTypes = filter.types;
    }
    switch (filter.state) {
      case 1:
        params.Handled = false;
        break;
      case 2:
        params.Handled = true;
        params.IsMisInfo = false;
        break;
      case 3:
        params.IsMisInfo = true;
        break;
      default:
        break;
    }

    if (filter.taskId) {
      params.TaskId = filter.taskId;
    }

    params.Desc = 'EventTime';

    return this.service.event.list(params);
  }

  private test = {
    shop: async (
      index: number,
      size: number,
      filter: SystemEventTableFilter
    ) => {
      let params = new GetShopsParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.BeginTime = filter.duration.begin;
      params.EndTime = filter.duration.end;
      let paged = await this.analysis.shop.list(params);
      let data = new PagedList<MobileEventRecord>();
      data.Page = paged.Page;

      data.Data = [];
      for (let i = 0; i < paged.Data.length; i++) {
        const shop = paged.Data[i];
        let item = await this.convert.shop(shop);
        data.Data.push(item);
      }
      return data;
    },
    sign: async (id: string) => {
      let params = new GetShopSignsParams();
      params.ShopIds = [id];
      return this.analysis.shop.sign.all(params);
    },
  };

  private convert = {
    shop: async (shop: Shop) => {
      let record = new MobileEventRecord();
      record.EventTime = shop.CreationTime;
      record.EventType = ArmEventType.ShopSignDisappeared;
      record.TriggerType = shop.ObjectState;
      record.IsLiveEvent = true;
      record.Id = shop.Id;
      record.BeginTime = shop.BeginTime;
      record.EndTime = shop.EndTime;
      record.Location = shop.Location;
      let signs = await this.test.sign(shop.Id);
      record.Resources = signs.map((x) => this.convert.sign(x));
      return record;
    },
    sign: (sign: ShopSign) => {
      let resource = new EventResourceContent();
      resource.ImageUrl = sign.ImageUrl;
      resource.ResourceId = sign.Id;
      resource.ResourceName = sign.Text ?? '';
      resource.RecordUrl = '2025_04_25/quyang/C2_2025_04_25T09_33_04_R.mkv';
      resource.PositionNo = sign.CameraNo ? parseInt(sign.CameraNo) : undefined;
      resource.Objects = [this.convert.object(sign)];
      return resource;
    },
    object: (sign: ShopSign) => {
      let data = new EventDataObject();
      data.Confidence = sign.Confidence ?? 0;
      data.Id = sign.Id;
      data.Polygon = sign.Polygon ?? [];
      return data;
    },
  };

  private create = {
    record: () => {
      let record = new MobileEventRecord();
      record.EventTime = new Date();
      record.EventType = ArmEventType.ShopSignCreated;
      record.TriggerType = ArmEventTriggerType.Begin;
      record.IsLiveEvent = true;
      record.Id = '1';
      record.BeginTime = new Date();
      record.EndTime = new Date();
      record.Location = new GisPoint();
      record.Location.Longitude = 121.31;
      record.Location.Latitude = 31.23;
      record.Resources = [this.create.resource()];
      return record;
    },
    resource: () => {
      let resource = new EventResourceContent();

      resource.ResourceId = '1';
      resource.ResourceName = '商铺招牌';
      resource.RecordUrl = '2025_04_25/quyang/C2_2025_04_25T09_33_04_R.mkv';
      resource.PositionNo = 1;
      return resource;
    },
  };
}
