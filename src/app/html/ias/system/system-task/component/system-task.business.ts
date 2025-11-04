import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../common/storage/local.storage';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemTaskBusiness {
  constructor(private local: LocalStorage) {}

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.task_file) >= 0) {
      let task = this.local.system.task.info.get();
      if (task) {
        title = task.Name;
      } else {
        title = '任务文件';
      }
    } else if (location.pathname.indexOf(SystemPath.task_shop) >= 0) {
      title = '商铺分析任务';
    } else if (location.pathname.indexOf(SystemPath.task_gps) >= 0) {
      title = '定制场景任务';
    } else if (location.pathname.indexOf(SystemPath.task_index) >= 0) {
      title = 'AI分析任务';
    }
    return title;
  }
}
