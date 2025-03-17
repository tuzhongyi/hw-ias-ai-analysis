import { CommonModule } from '@angular/common';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { PictureWindowContentComponent } from '../../share/picture-window-content/picture-window-content.component';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapFilterComponent } from '../system-map-filter/system-map-filter.component';
import { SystemMapPanelDetailsShopComponent } from '../system-map-panel-details-shop/system-map-panel-details-shop.component';
import { SystemMapSearchComponent } from '../system-map-search/system-map-search.component';
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
  SystemMapPanelDetailsShopComponent,
  WindowComponent,
  PictureWindowContentComponent,
  SystemMapSourceManagerComponent,
  SystemMapTaskManagerComponent,
];
