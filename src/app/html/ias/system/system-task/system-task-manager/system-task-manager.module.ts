import { CommonModule } from '@angular/common';
import { WindowConfirmComponent } from '../../../../../common/components/window-confirm/window-confirm.component';
import { SystemTaskCreationComponent } from '../system-task-creation/component/system-task-creation.component';

import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../common/components/date-time-control/date-time-control.component';

import { WindowComponent } from '../../../share/window/window.component';
import { SystemTaskDetailsComponent } from '../system-task-details/component/system-task-details.component';
import { SystemTaskFileManagerComponent } from '../system-task-file/system-task-file-manager/system-task-file-manager.component';
import { SystemTaskResultComponent } from '../system-task-result/component/system-task-result.component';
import { SystemTaskTableComponent } from '../system-task-table/system-task-table.component';
import { SystemTaskManagerFileBusiness } from './business/system-task-manager-file.business';
import { SystemTaskManagerTaskBusiness } from './business/system-task-manager-task.business';
import { SystemTaskManagerBusiness } from './business/system-task-manager.business';
import { SystemTaskManagerDurationController } from './controller/system-task-manager-duration.controller';
import { SystemTaskManagerFileController } from './controller/system-task-manager-file.controller';
import { SystemTaskManagerController } from './controller/system-task-manager.controller';

export const SystemTaskManagerImports = [
  CommonModule,
  FormsModule,
  SystemTaskTableComponent,
  SystemTaskCreationComponent,
  WindowConfirmComponent,
  DateTimeControlComponent,
  SystemTaskResultComponent,
  SystemTaskDetailsComponent,
  SystemTaskFileManagerComponent,
  WindowComponent,
];

export const SystemTaskManagerProviders = [
  SystemTaskManagerTaskBusiness,
  SystemTaskManagerFileBusiness,
  SystemTaskManagerBusiness,
  SystemTaskManagerFileController,
  SystemTaskManagerDurationController,
  SystemTaskManagerController,
];
