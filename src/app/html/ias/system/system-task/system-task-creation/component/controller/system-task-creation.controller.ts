import { Injectable } from '@angular/core';
import { SystemTaskCreationFileController } from './system-task-creation-file.controller';
import { SystemTaskCreationSourceController } from './system-task-creation-source.controller';

@Injectable()
export class SystemTaskCreationController {
  constructor(
    public source: SystemTaskCreationSourceController,
    public file: SystemTaskCreationFileController
  ) {}
}
