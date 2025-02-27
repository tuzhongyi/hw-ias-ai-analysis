import { Injectable } from '@angular/core';
import { ManagementUserInfoDetailsPriorityController } from './management-user-info-details-priority.controller';

@Injectable()
export class ManagementUserInfoDetailsController {
  constructor(public priority: ManagementUserInfoDetailsPriorityController) {}
}
