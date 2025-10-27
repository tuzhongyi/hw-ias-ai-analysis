import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemModuleShopRegistrationInformationSourceController {
  states: Promise<EnumNameValue<number>[]>;

  constructor(source: SourceManager) {
    this.states = source.analysis.shop.BusinessStates.get();
  }
}
