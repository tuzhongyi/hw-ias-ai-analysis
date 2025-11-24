import { Injectable } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemEventManagerShopSource {
  type: Promise<EnumNameValue<number>[]>;
  state: EnumNameValue<number>[];
  task: AnalysisTask[] = [];

  constructor(source: SourceManager) {
    this.type = this.init.type();
    this.state = this.init.state();
  }

  private init = {
    state: () => {
      return [
        { Name: '待处置', Value: 1 },
        { Name: '已处置', Value: 2 },
        { Name: '屏蔽或误报', Value: 3 },
      ];
    },
    type: async () => {
      return [
        { Name: '店铺装修', Value: 7 },
        { Name: '店招消失', Value: 8 },
        { Name: '店招新增', Value: 9 },
      ];
    },
  };
}
