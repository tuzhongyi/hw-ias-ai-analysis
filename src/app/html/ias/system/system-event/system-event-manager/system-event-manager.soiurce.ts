import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemEventManagerSource {
  type: Promise<EnumNameValue<number>[]>;
  state: EnumNameValue<number>[];

  constructor(source: SourceManager) {
    this.type = source.event.EventTypes.get();
    this.state = this.init.state();
  }

  private init = {
    state: () => {
      return [
        { Name: '待派单', Value: 0 },
        { Name: '已派单', Value: 1 },
        { Name: '待处置', Value: 2 },
        { Name: '已处置', Value: 3 },
        { Name: '误报', Value: 4 },
      ];
    },
  };
}
