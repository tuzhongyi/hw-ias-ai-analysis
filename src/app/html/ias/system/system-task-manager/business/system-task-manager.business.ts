import { Injectable } from '@angular/core';
import { SystemTaskManagerFileBusiness } from './system-task-manager-file.business';
import { SystemTaskManagerTaskBusiness } from './system-task-manager-task.business';

@Injectable()
export class SystemTaskManagerBusiness {
  constructor(
    public task: SystemTaskManagerTaskBusiness,
    public file: SystemTaskManagerFileBusiness
  ) {}
}
