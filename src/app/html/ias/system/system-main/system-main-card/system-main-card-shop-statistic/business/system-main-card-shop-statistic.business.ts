import { Injectable } from '@angular/core';
import { ShopTaskStatistic } from '../../../../../../../common/data-core/models/arm/analysis/task/shop-task-statistic.model';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardShopStatisticRoadService } from './service/system-main-card-shop-statistic-road.service';
import { SystemMainCardShopStatisticTaskService } from './service/system-main-card-shop-statistic-task.service';

@Injectable()
export class SystemMainCardShopStatisticBusiness {
  constructor(
    geo: ArmGeographicRequestService,
    analysis: ArmAnalysisRequestService
  ) {
    this.service = {
      task: new SystemMainCardShopStatisticTaskService(analysis),
      road: new SystemMainCardShopStatisticRoadService(geo),
    };
  }

  private service: {
    task: SystemMainCardShopStatisticTaskService;
    road: SystemMainCardShopStatisticRoadService;
  };

  async load(duration: Duration) {
    let road = await this.service.road.load();
    let task = await this.service.task.load(duration);

    if (task.length == 0) {
      return new ShopTaskStatistic();
    }

    let roadnames = road.map((item) => item.Name);

    let group = ArrayTool.groupBy(task, (item) => {
      let roadname = roadnames.find((name) => (item.Name ?? '').includes(name));
      if (roadname) {
        return roadname;
      }
      return item.Name ?? '';
    });
    let taskIds = [];
    for (let key in group) {
      let items = group[key];

      if (items.length > 0) {
        taskIds.push(items[0].Id);
      }
    }
    return this.service.task.statistic(taskIds);
  }
}
