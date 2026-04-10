import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../common/storage/local.storage';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemTaskBusiness {
  constructor(private local: LocalStorage) {}

  headable = true;

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.task_file) >= 0) {
      this.headable = true;
      let task = this.local.system.task.info.get();
      if (task) {
        title = task.Name;
      } else {
        title = '任务文件';
      }
    } else if (location.pathname.indexOf(SystemPath.task_shop) >= 0) {
      this.headable = true;
      title = '商铺分析任务';
    } else if (location.pathname.indexOf(SystemPath.task_gps) >= 0) {
      this.headable = true;
      title = '定制场景任务';
    } else if (location.pathname.indexOf(SystemPath.task_road_object) >= 0) {
      this.headable = false;
      title = '道路物件任务';
    } else if (location.pathname.indexOf(SystemPath.task_index) >= 0) {
      this.headable = true;
      title = 'AI分析任务';
    }

    return title;
  }
}
