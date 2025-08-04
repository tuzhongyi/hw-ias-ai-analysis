import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemEventManagerRealtimeSource {
  type: EnumNameValue<number>[];
  state: EnumNameValue<number>[];
  emergency: Promise<EnumNameValue<number>[]>;

  constructor(source: SourceManager) {
    this.state = this.init.state();
    this.type = this.init.type();
    this.emergency = source.event.EmergencyTypes.get();
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
        { Name: '机动车乱停', Value: 1 },
        { Name: '非机动车乱停', Value: 2 },
        { Name: '暴露垃圾', Value: 3 },
        { Name: '突发情况', Value: 10 },
      ];
    },
  };
}
