import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonLabelSelecComponent } from '../../../../../../common/components/common-label-select/common-label-select.component';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { WheelInputNumberDirective } from '../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { InputSelectRoadComponent } from '../../../../share/input-select-road/input-select-road.component';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { SelectShopObjectStateComponent } from '../../../../share/select/select-shop-object-state/select-shop-object-state.component';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemModuleShopDetailsComponent } from '../system-module-shop-details/system-module-shop-details.component';
import { SystemModuleShopInformationComponent } from '../system-module-shop-information/system-module-shop-information.component';
import { SystemModuleShopListComponent } from '../system-module-shop-list/system-module-shop-list.component';
import { SystemModuleShopTableComponent } from '../system-module-shop-table/system-module-shop-table.component';
import { SystemModuleShopManagerDurationController } from './controller/system-module-shop-manager-duration.controller';
import { SystemModuleShopManagerSourceController } from './controller/system-module-shop-manager-source.controller';
import { SystemModuleShopManagerStateController } from './controller/system-module-shop-manager-state.controller';

export const SystemModuleShopManagerImports = [
  CommonModule,
  FormsModule,
  DateTimeControlComponent,
  SystemModuleShopTableComponent,
  SystemModuleShopListComponent,
  CommonLabelSelecComponent,
  SelectShopObjectStateComponent,
  SystemModuleShopDetailsComponent,
  SystemModuleShopInformationComponent,
  InputSelectRoadComponent,
  WheelInputNumberDirective,
  WindowComponent,
  PictureListComponent,
];
export const SystemModuleShopManagerProviders = [
  SystemModuleShopManagerDurationController,
  SystemModuleShopManagerStateController,
  SystemModuleShopManagerSourceController,
];
