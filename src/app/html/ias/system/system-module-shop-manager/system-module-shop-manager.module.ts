import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonLabelSelecComponent } from '../../../../common/components/common-label-select/common-label-select.component';
import { DateTimeControlComponent } from '../../../../common/components/date-time-control/date-time-control.component';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { SelectShopObjectStateComponent } from '../../share/select/select-shop-object-state/select-shop-object-state.component';
import { SystemModuleShopDetailsComponent } from '../system-module-shop-details/system-module-shop-details.component';
import { SystemModuleShopTableComponent } from '../system-module-shop-table/system-module-shop-table.component';
import { SystemModuleShopManagerDurationController } from './controller/system-module-shop-manager-duration.controller';
import { SystemModuleShopManagerSourceController } from './controller/system-module-shop-manager-source.controller';
import { SystemModuleShopManagerStateController } from './controller/system-module-shop-manager-state.controller';

export const SystemModuleShopManagerImports = [
  CommonModule,
  FormsModule,
  DateTimeControlComponent,
  SystemModuleShopTableComponent,
  CommonLabelSelecComponent,
  SelectShopObjectStateComponent,
  SystemModuleShopDetailsComponent,
  WindowComponent,
  ContentHeaderComponent,
];
export const SystemModuleShopManagerProviders = [
  SystemModuleShopManagerDurationController,
  SystemModuleShopManagerStateController,
  SystemModuleShopManagerSourceController,
];
