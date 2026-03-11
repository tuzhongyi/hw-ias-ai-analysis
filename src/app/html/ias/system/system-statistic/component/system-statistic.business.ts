import { Injectable } from '@angular/core';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemStatisticBusiness {
  constructor() {}

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.statistic_road_object) >= 0) {
      title = '道路部件统计';
    } else if (location.pathname.indexOf(SystemPath.statistic) >= 0) {
      title = '分析统计';
    }
    return title;
  }
}
