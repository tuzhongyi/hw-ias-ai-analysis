import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemEventManagerRealtimeSource {
  type: Promise<EnumNameValue<number>[]>;
  handle: EnumNameValue<boolean>[];
  misinform: EnumNameValue<boolean>[];

  constructor(source: SourceManager) {
    this.handle = this.init.handle();
    this.misinform = this.init.misinform();
    this.type = source.event.LiveEventTypes.get();
  }

  private init = {
    handle: () => {
      return [
        { Name: '待处置', Value: false },
        { Name: '已处置', Value: true },
      ];
    },
    misinform: () => {
      return [
        { Name: '误报', Value: true },
        { Name: '非误报', Value: false },
      ];
    },
  };
}
