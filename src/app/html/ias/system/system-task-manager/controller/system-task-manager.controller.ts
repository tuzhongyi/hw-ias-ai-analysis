import { Injectable } from '@angular/core';
import { SystemTaskManagerFileController } from './system-task-manager-file.controller';

@Injectable()
export class SystemTaskManagerController {
  constructor(public file: SystemTaskManagerFileController) {}
}
