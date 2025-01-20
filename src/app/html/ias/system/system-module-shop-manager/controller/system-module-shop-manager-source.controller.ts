import { Injectable } from '@angular/core';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';
import { Duration } from '../../../../../common/tools/date-time-tool/duration.model';
import { SystemModuleShopManagerDurationController } from './system-module-shop-manager-duration.controller';
import { SystemModuleShopManagerStateController } from './system-module-shop-manager-state.controller';

@Injectable()
export class SystemModuleShopManagerSourceController {
  constructor(
    duration: SystemModuleShopManagerDurationController,
    public state: SystemModuleShopManagerStateController,
    private manager: Manager
  ) {
    this.duration = duration.load();
    this.types = new Promise<EnumNameValue<SignType>[]>((resolve) => {
      this.manager.capability.analysis.shop.then((x) => {
        if (x.SignTypes) {
          resolve(x.SignTypes);
        }
      });
    });
  }

  duration: EnumNameValue<Duration>[];

  types: Promise<EnumNameValue<SignType>[]>;
}
