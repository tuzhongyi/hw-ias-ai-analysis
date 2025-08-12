import { Injectable } from '@angular/core';
import { ArmEventType } from '../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { GetMobileEventsParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardEventStatisticItem } from '../system-main-card-event-statistic-item/system-main-card-event-statistic-item.model';

@Injectable()
export class SystemMainCardEventStatisticBusiness {
  constructor(
    system: ArmSystemRequestService,
    analysis: ArmAnalysisRequestService
  ) {
    this.service = { system, analysis };
  }
  private service: {
    system: ArmSystemRequestService;
    analysis: ArmAnalysisRequestService;
  };

  async shop(duration: Duration) {
    let types = [
      ArmEventType.ShopRenovation,
      ArmEventType.ShopSignDisappeared,
      ArmEventType.ShopSignCreated,
    ];
    let page = await this.data.event(duration, types);
    let item = new SystemMainCardEventStatisticItem();
    item.icon = 'shop';
    item.name = '商铺更变';
    item.value = page.TotalRecordCount;
    return item;
  }

  async realtime(duration: Duration) {
    let types = [
      ArmEventType.VehicleIllegalParking,
      ArmEventType.BicycleIllegalParking,
      ArmEventType.GarbageExposure,
      ArmEventType.EmergencyEvent,
    ];
    let page = await this.data.event(duration, types);
    let item = new SystemMainCardEventStatisticItem();
    item.icon = 'realtime';
    item.name = '实时事件';
    item.value = page.TotalRecordCount;
    return item;
  }
  async analysis(duration: Duration) {
    let types = [
      ArmEventType.RoadDeviceBroken,
      ArmEventType.ShopSignBroken,
      ArmEventType.RoadWork,
    ];
    let page = await this.data.event(duration, types);
    let item = new SystemMainCardEventStatisticItem();
    item.icon = 'analysis';
    item.name = '分析事件';
    item.value = page.TotalRecordCount;
    return item;
  }
  async task(duration: Duration) {
    let page = await this.data.task(duration);
    let item = new SystemMainCardEventStatisticItem();
    item.icon = 'task';
    item.name = '巡逻次数';
    item.value = page.TotalRecordCount;
    return item;
  }

  private data = {
    event: async (duration: Duration, types: number[]) => {
      let params = new GetMobileEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.PageIndex = 1;
      params.PageSize = 1;
      params.EventTypes = types;
      let paged = await this.service.system.event.list(params);
      return paged.Page;
    },
    task: async (duration: Duration) => {
      let params = new GetAnalysisTaskListParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.PageIndex = 1;
      params.PageSize = 1;
      let paged = await this.service.analysis.server.task.list(params);
      return paged.Page;
    },
  };
}
