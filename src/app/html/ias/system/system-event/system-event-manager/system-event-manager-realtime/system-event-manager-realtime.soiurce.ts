import { Injectable } from '@angular/core';
import { Division } from '../../../../../../common/data-core/models/arm/division/division.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../common/data-core/requests/managers/source/source.manager';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';

@Injectable()
export class SystemEventManagerRealtimeSource {
  type: Promise<EnumNameValue<number>[]>;
  handle: EnumNameValue<boolean>[];
  misinform: EnumNameValue<boolean>[];
  division = new Map<string, Division>();
  gridcell = new Map<string, Division>();

  constructor(
    source: SourceManager,
    private service: ArmDivisionRequestService
  ) {
    this.handle = this.init.handle();
    this.misinform = this.init.misinform();
    this.type = source.event.LiveEventTypes.get();
    this.init.division();
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
    division: () => {
      this.service.cache.all().then((divisions) => {
        divisions.forEach((division) => {
          if (division.DivisionType === 4) {
            this.gridcell.set(division.Id, division);
          } else {
            this.division.set(division.Id, division);
          }
        });
      });
    },
  };
}
