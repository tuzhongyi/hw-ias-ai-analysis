import { EventEmitter, Injectable } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { SystemMapTaskShopArgs } from '../../business/system-map-shop.model';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelTaskController extends SystemMapPanel {
  compare = new EventEmitter<SystemMapTaskShopArgs>();
  return = new EventEmitter<void>();

  selecteds: string[] = [];
  /** 名称 */
  name?: string;
  /** 加载任务 */
  load = new EventEmitter<string>();
  /** 是否与底库比较 */
  base = false;
  /** 所有任务 */
  datas: AnalysisTask[] = [];

  constructor() {
    super();
  }

  oncompare(completing: boolean) {
    let args = new SystemMapTaskShopArgs();
    args.ids = this.selecteds;
    if (this.base) {
      args.base = this.datas
        .map((x) => x.Id)
        .filter((x) => !this.selecteds.includes(x));
    }

    if (completing) {
      this.compare.emit(args);
    } else {
      this.return.emit();
    }
  }

  onclose() {
    this.selecteds = [];
    this.show = false;
  }

  onloaded(datas: AnalysisTask[]) {
    this.datas = datas;
  }
}
