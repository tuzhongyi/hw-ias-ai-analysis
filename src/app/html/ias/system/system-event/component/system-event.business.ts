import { Injectable } from '@angular/core';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemEventBusiness {
  constructor() {}

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.event) >= 0) {
      title = 'AI分析事件';
    }
    if (location.pathname.indexOf(SystemPath.event_shop_manager) >= 0) {
      title = '商铺事件';
    } else if (
      location.pathname.indexOf(SystemPath.event_realtime_manager) >= 0
    ) {
      title = '实时事件';
    } else if (
      location.pathname.indexOf(SystemPath.event_analysis_manager) >= 0
    ) {
      title = '分析事件';
    } else if (
      location.pathname.indexOf(SystemPath.event_gps_task_manager) >= 0
    ) {
      title = '定制场景事件';
    } else if (
      location.pathname.indexOf(SystemPath.event_road_object_manager) >= 0
    ) {
      title = '道路物件事件';
    } else if (location.pathname.indexOf(SystemPath.event) >= 0) {
      title = 'AI分析事件';
    }
    return title;
  }
}
