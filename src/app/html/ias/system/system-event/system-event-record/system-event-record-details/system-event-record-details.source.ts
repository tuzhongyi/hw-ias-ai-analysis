import { Injectable } from '@angular/core';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';

@Injectable()
export class SystemEventRecordDetailsSource {
  constructor(
    private language: LanguageTool,
    division: ArmDivisionRequestService
  ) {
    this.service = { division };
  }

  private service: {
    division: ArmDivisionRequestService;
  };

  type(type: number) {
    return this.language.event.EventType(type);
  }

  division(id: string) {
    return this.service.division.cache.get(id);
  }
}
