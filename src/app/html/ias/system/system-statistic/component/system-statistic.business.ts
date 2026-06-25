import { Injectable } from '@angular/core';
import { LanguageTool } from '../../../../../common/tools/language-tool/language.tool';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemStatisticBusiness {
  constructor(private language: LanguageTool) {}

  headable = true;

  load(): string {
    let title = '';
    if (
      location.pathname.indexOf(SystemPath.statistic_road_object_statement) >= 0
    ) {
      this.headable = false;
      title = '道路部件月报表';
    } else if (
      location.pathname.indexOf(SystemPath.statistic_road_object_duration) >= 0
    ) {
      this.headable = false;
      title = '道路部件巡检统计';
    } else if (
      location.pathname.indexOf(SystemPath.statistic_road_object) >= 0
    ) {
      this.headable = false;
      title = '道路部件巡检统计';
    } else if (
      location.pathname.indexOf(SystemPath.statistic_device_route) >= 0
    ) {
      this.headable = true;
      title = `${this.language.device.Name}行驶统计`;
    } else if (location.pathname.indexOf(SystemPath.statistic) >= 0) {
      this.headable = true;
      title = '分析统计';
    }
    return title;
  }
}
