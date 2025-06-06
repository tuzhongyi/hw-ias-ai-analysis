import { Injectable } from '@angular/core';
import { SystemEventManagerProcessController } from './process/system-event-manager-process.controller';

@Injectable()
export class SystemEventManagerController {
  constructor(public process: SystemEventManagerProcessController) {}
}
