import { CommonModule } from '@angular/common';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { SystemTaskCreationComponent } from '../system-task-creation/system-task-creation.component';

import { SystemTaskDetailsComponent } from '../system-task-details/system-task-details.component';
import { SystemTaskResultComponent } from '../system-task-result/system-task-result.component';
import { SystemTaskTableComponent } from '../system-task-table/system-task-table.component';
import { SystemTaskManagerFileBusiness } from './business/system-task-manager-file.business';
import { SystemTaskManagerTaskBusiness } from './business/system-task-manager-task.business';
import { SystemTaskManagerBusiness } from './business/system-task-manager.business';
import { SystemTaskManagerFileController } from './controller/system-task-manager-file.controller';
import { SystemTaskManagerController } from './controller/system-task-manager.controller';

export const SystemTaskManagerImports = [
  CommonModule,
  ContentHeaderComponent,
  SystemTaskTableComponent,
  SystemTaskCreationComponent,
  WindowComponent,
  WindowConfirmComponent,
  SystemTaskResultComponent,
  SystemTaskDetailsComponent,
];

export const SystemTaskManagerProviders = [
  SystemTaskManagerTaskBusiness,
  SystemTaskManagerFileBusiness,
  SystemTaskManagerBusiness,
  SystemTaskManagerFileController,
  SystemTaskManagerController,
];
