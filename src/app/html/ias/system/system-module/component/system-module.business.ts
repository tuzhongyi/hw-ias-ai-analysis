import { Injectable } from '@angular/core';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemModuleBusiness {
  constructor() {}

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.module_shop_registration) >= 0) {
      title = '注册商铺管理';
    } else if (location.pathname.indexOf(SystemPath.module_shop_compare) >= 0) {
      title = '商铺管理';
    } else if (location.pathname.indexOf(SystemPath.module_shop) >= 0) {
      title = '分析商铺';
    } else if (location.pathname.indexOf(SystemPath.module_road_section) >= 0) {
      title = '屏蔽路段管理';
    } else if (location.pathname.indexOf(SystemPath.module_road) >= 0) {
      title = '道路管理';
    } else if (
      location.pathname.indexOf(SystemPath.module_mobile_device_route) >= 0
    ) {
      title = '巡检线路';
    } else if (location.pathname.indexOf(SystemPath.module_gps_task) >= 0) {
      title = '定制场景';
    } else if (location.pathname.indexOf(SystemPath.module) >= 0) {
      title = 'AI功能模块';
    }
    return title;
  }
}
