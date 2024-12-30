import { Injectable } from '@angular/core';
import { SystemTaskResultInfoImageController } from './system-task-result-info-image.controller';

@Injectable()
export class SystemTaskResultInfoController {
  constructor(public image: SystemTaskResultInfoImageController) {}
}
