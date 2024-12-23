import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Duration } from '../../../../../common/tools/date-time-tool/duration.model';
import { SystemModuleShopManagerDurationController } from './system-module-shop-manager-duration.controller';
import { SystemModuleShopManagerStateController } from './system-module-shop-manager-state.controller';

@Injectable()
export class SystemModuleShopManagerSourceController {
  constructor(
    duration: SystemModuleShopManagerDurationController,
    public state: SystemModuleShopManagerStateController
  ) {
    this.duration = duration.load();
  }

  duration: EnumNameValue<Duration>[];
}
