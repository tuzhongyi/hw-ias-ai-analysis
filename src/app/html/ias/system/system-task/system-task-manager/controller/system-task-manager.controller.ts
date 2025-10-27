import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { SystemTaskManagerDurationController } from './system-task-manager-duration.controller';
import { SystemTaskManagerFileController } from './system-task-manager-file.controller';

@Injectable()
export class SystemTaskManagerController {
  constructor(
    public file: SystemTaskManagerFileController,
    public duration: SystemTaskManagerDurationController,
    manager: Manager
  ) {
    this.channels = manager.source.analysis.shop.CameraNos.get();
  }

  channels: Promise<EnumNameValue[]>;
}
