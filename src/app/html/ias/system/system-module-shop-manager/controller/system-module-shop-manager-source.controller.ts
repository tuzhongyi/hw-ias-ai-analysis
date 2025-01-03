import { Injectable } from '@angular/core';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Duration } from '../../../../../common/tools/date-time-tool/duration.model';
import { EnumTool } from '../../../../../common/tools/enum-tool/enum.tool';
import { SystemModuleShopManagerDurationController } from './system-module-shop-manager-duration.controller';
import { SystemModuleShopManagerStateController } from './system-module-shop-manager-state.controller';

@Injectable()
export class SystemModuleShopManagerSourceController {
  constructor(
    duration: SystemModuleShopManagerDurationController,
    public state: SystemModuleShopManagerStateController
  ) {
    this.duration = duration.load();
    this.types = EnumTool.values(SignType);
  }

  duration: EnumNameValue<Duration>[];

  types: number[];
}
