import { Injectable } from '@angular/core';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemStatisticBusiness {
  constructor() {}

  headable = true;

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.statistic_road_object) >= 0) {
      this.headable = false;
      title = '道路部件统计';
    } else if (
      location.pathname.indexOf(SystemPath.statistic_device_route) >= 0
    ) {
      this.headable = true;
      title = '巡检车辆行驶统计';
    } else if (location.pathname.indexOf(SystemPath.statistic) >= 0) {
      this.headable = true;
      title = '分析统计';
    }
    return title;
  }
}
