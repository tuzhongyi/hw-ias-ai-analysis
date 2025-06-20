import { EventEmitter, Injectable } from '@angular/core';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { TaskCompareType } from '../../../system-map-task/system-map-task-manager/system-map-task-manager.model';

import { SystemMapTaskArgs } from '../../business/task/system-map-task.model';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelTaskController extends SystemMapPanel {
  compare = new EventEmitter<SystemMapTaskArgs>();
  return = new EventEmitter<void>();

  compared = false;
  selecteds: string[] = [];
  /** 名称 */
  name?: string;
  /** 加载任务 */
  load = new EventEmitter<string>();

  /** 所有任务 */
  datas: AnalysisTask[] = [];

  constructor() {
    super();
  }

  oncompare(type?: TaskCompareType) {
    let args = new SystemMapTaskArgs();
    args.ids = this.selecteds;
    args.type = type;
    this.compared = true;
    this.compare.emit(args);
  }

  onreturn() {
    this.compared = false;
    this.return.emit();
  }

  onclose() {
    this.selecteds = [];
    this.show = false;
  }

  onloaded(datas: AnalysisTask[]) {
    this.datas = datas;
  }
}
