import { Injectable } from '@angular/core';
import { SystemTaskManagerDurationController } from './system-task-manager-duration.controller';
import { SystemTaskManagerFileController } from './system-task-manager-file.controller';

@Injectable()
export class SystemTaskManagerController {
  constructor(
    public file: SystemTaskManagerFileController,
    public duration: SystemTaskManagerDurationController
  ) {}
}
