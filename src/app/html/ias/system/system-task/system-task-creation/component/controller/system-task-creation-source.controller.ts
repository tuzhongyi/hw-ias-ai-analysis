import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemTaskCreationSourceController {
  types: Promise<EnumNameValue<number>[]>;
  sources: Promise<EnumNameValue<number>[]>;
  constructor(source: SourceManager) {
    this.types = source.server.TaskTypes;
    this.sources = source.server.SourceTypes;
  }
}
