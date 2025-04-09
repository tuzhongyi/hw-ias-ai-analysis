import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../common/storage/local.storage';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemTaskBusiness {
  constructor(private local: LocalStorage) {}

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.module_shop) >= 0) {
      title = '商铺管理';
    } else if (location.pathname.indexOf(SystemPath.module_road) >= 0) {
      title = '道路管理';
    } else if (location.pathname.indexOf(SystemPath.module) >= 0) {
      title = 'AI功能模块';
    } else if (location.pathname.indexOf(SystemPath.task_file) >= 0) {
      let task = this.local.system.task.info.get();
      if (task) {
        title = task.Name;
      } else {
        title = '任务文件';
      }
    } else if (location.pathname.indexOf(SystemPath.task) >= 0) {
      title = 'AI分析任务';
    } else if (location.pathname.indexOf(SystemPath.map) >= 0) {
      title = '地图';
    }
    return title;
  }
}
