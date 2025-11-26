import { CommonModule } from '@angular/common';
import { SystemTaskCreationComponent } from '../system-task-creation/component/system-task-creation.component';

import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../common/components/container-page/container-page.component';
import { ContainerZoomComponent } from '../../../../../../common/components/container-zoom/container-zoom.component';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { PicturePolygonComponent } from '../../../../share/picture/picture-polygon/picture-polygon.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemTaskDetailsComponent } from '../system-task-details/component/system-task-details.component';
import { SystemTaskFileManagerComponent } from '../system-task-file/system-task-file-manager/system-task-file-manager.component';
import { SystemTaskResultComponent } from '../system-task-result/component/system-task-result.component';
import { SystemTaskRouteManagerComponent } from '../system-task-route/system-task-route-manager/system-task-route-manager.component';
import { SystemTaskShopAnalysisManagerComponent } from '../system-task-shop-analysis/system-task-shop-analysis-manager/system-task-shop-analysis-manager.component';
import { SystemTaskShopRegistrationManagerComponent } from '../system-task-shop-registration/system-task-shop-registration-manager/system-task-shop-registration-manager.component';
import { SystemTaskTableComponent } from '../system-task-table/system-task-table.component';
import { SystemTaskVideoComponent } from '../system-task-video/system-task-video.component';
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
  SystemTaskRouteManagerComponent,
  SystemTaskVideoComponent,
  SystemTaskShopAnalysisManagerComponent,
  SystemTaskShopRegistrationManagerComponent,
  ContainerZoomComponent,
  ContainerPageComponent,
  PicturePolygonComponent,
];

export const SystemTaskManagerProviders = [
  SystemTaskManagerTaskBusiness,
  SystemTaskManagerFileBusiness,
  SystemTaskManagerBusiness,
  SystemTaskManagerFileController,
  SystemTaskManagerDurationController,
  SystemTaskManagerController,
];
