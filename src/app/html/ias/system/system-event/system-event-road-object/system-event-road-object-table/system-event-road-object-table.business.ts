import { Injectable } from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectEventsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-object/event/geographic-road-object-event.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import {
  SystemEventRoadObjectTableFilter,
  SystemEventRoadObjectTableItem,
} from './system-event-road-object-table.model';

@Injectable()
export class SystemEventRoadObjectTableBusiness {
  constructor(
    public medium: MediumRequestService,
    geo: ArmGeographicRequestService,
    division: ArmDivisionRequestService,
    private language: LanguageTool
  ) {
    this.service = { geo, division };
  }

  private service: {
    geo: ArmGeographicRequestService;
    division: ArmDivisionRequestService;
  };

  async load(
    index: number,
    size: number,
    filter: SystemEventRoadObjectTableFilter
  ) {
    let data = await this.data.load(index, size, filter);
    if (data.Page.RecordCount == 0 && data.Page.PageIndex > 1) {
      data = await this.data.load(index - 1, size, filter);
    }

    let paged = new PagedList<SystemEventRoadObjectTableItem>();
    paged.Data = data.Data.map((x) => this.convert(x));
    paged.Page = data.Page;
    return paged;
  }

  private convert(data: RoadObjectEventRecord) {
    let item = new SystemEventRoadObjectTableItem();
    item = Object.assign(item, data);

    item.EventTypeName = this.language.road.object.EventTypes(data.EventType);

    if (data.DivisionId) {
      item.DivisionName = this.service.division.cache
        .get(data.DivisionId)
        .then((x) => x.Name);
    }
    if (data.GridCellId) {
      item.GridCellName = this.service.division.cache
        .get(data.GridCellId)
        .then((x) => x.Name);
    }
    return item;
  }

  private data = {
    load: (
      index: number,
      size: number,
      filter: SystemEventRoadObjectTableFilter
    ) => {
      let params = new GetRoadObjectEventsParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.BeginTime = filter.duration.begin;
      params.EndTime = filter.duration.end;
      if (filter.type != undefined) {
        params.RoadObjectType = filter.type;
      }
      if (filter.confirmed != undefined) {
        params.Confirmed = filter.confirmed;
      }
      if (filter.event != undefined) {
        params.EventType = filter.event;
      }
      if (filter.misinform != undefined) {
        params.IsMisInfo = filter.misinform;
      }
      if (filter.handled != undefined) {
        params.Handled = filter.handled;
      }
      if (filter.divisionId) {
        params.DivisionIds = [filter.divisionId];
      }
      if (filter.gridCellId) {
        params.GridCellIds = [filter.gridCellId];
      }
      if (filter.assigned !== undefined) {
        params.Assigned = filter.assigned;
      }

      params.Asc = filter.asc;
      params.Desc = filter.desc;
      return this.service.geo.road.object.event.list(params);
    },
  };
}
