import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { SystemEventManagerShopProcessController } from './process/system-event-manager-shop-process.controller';

@Injectable()
export class SystemEventManagerShopController {
  constructor(
    public process: SystemEventManagerShopProcessController,
    manager: Manager
  ) {
    this.channels = manager.source.shop.CameraNos.get();
  }

  channels: Promise<EnumNameValue[]>;
}
