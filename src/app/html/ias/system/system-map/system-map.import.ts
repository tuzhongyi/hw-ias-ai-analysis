import { CommonModule } from '@angular/common';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { PictureWindowContentPageComponent } from '../../share/picture-window-content-page/picture-window-content-page.component';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapFilterComponent } from '../system-map-filter/system-map-filter.component';
import { SystemMapPanelDetailsShopRegistrationComponent } from '../system-map-panel-details-shop-registration/system-map-panel-details-shop-registration.component';
import { SystemMapPanelDetailsShopSignComponent } from '../system-map-panel-details-shop-sign/system-map-panel-details-shop-sign.component';
import { SystemMapPanelDetailsShopComponent } from '../system-map-panel-details-shop/system-map-panel-details-shop.component';
import { SystemMapSearchComponent } from '../system-map-search/system-map-search.component';
import { SystemMapSettingCompareComponent } from '../system-map-settings/system-map-setting-compare/system-map-setting-compare.component';
import { SystemMapSourceManagerComponent } from '../system-map-source-manager/system-map-source-manager.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemMapStatisticComponent } from '../system-map-statistic/system-map-statistic.component';
import { SystemMapTaskManagerComponent } from '../system-map-task/system-map-task-manager/system-map-task-manager.component';

export const SystemMapImports = [
  CommonModule,
  SystemMapStateComponent,
  SystemMapSearchComponent,
  SystemMapFilterComponent,
  SystemMapControlsComponent,
  SystemMapEditorCircleComponent,
  SystemMapStatisticComponent,
  SystemMapPanelDetailsShopRegistrationComponent,
  SystemMapPanelDetailsShopComponent,
  WindowComponent,
  PictureWindowContentPageComponent,
  SystemMapSourceManagerComponent,
  SystemMapTaskManagerComponent,
  SystemMapPanelDetailsShopSignComponent,

  SystemMapSettingCompareComponent,
];
