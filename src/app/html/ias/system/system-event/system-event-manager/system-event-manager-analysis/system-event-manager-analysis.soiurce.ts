import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemEventManagerAnalysisSource {
  type: EnumNameValue<number>[];
  state: EnumNameValue<number>[];

  constructor(source: SourceManager) {
    this.state = this.init.state();
    this.type = this.init.type();
  }

  private init = {
    state: () => {
      return [
        { Name: '待处置', Value: 1 },
        { Name: '已处置', Value: 2 },
        { Name: '屏蔽或误报', Value: 3 },
      ];
    },
    type: () => {
      return [
        { Name: '道路设施损坏', Value: 4 },
        { Name: '店招损坏', Value: 5 },
        { Name: '占道施工', Value: 6 },
      ];
    },
  };
}
