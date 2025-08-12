import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemEventManagerAnalysisController {
  constructor(manager: Manager) {
    this.channels = manager.source.shop.CameraNos.get();
  }

  channels: Promise<EnumNameValue[]>;
}
