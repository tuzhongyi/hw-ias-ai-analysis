import { SystemMapRoadBusiness } from './business/road/system-map-road.business';
import { SystemMapShopBusiness } from './business/shop/system-map-shop.business';
import { SystemMapShopTaskBaseBusiness } from './business/shop/task/system-map-shop-task-base.business';
import { SystemMapShopTaskCompareBusiness } from './business/shop/task/system-map-shop-task-compare.business';
import { SystemMapShopTaskBusiness } from './business/shop/task/system-map-shop-task.business';

import { SystemMapBusiness } from './business/system-map.business';
import { SystemMapAMapController } from './controller/amap/system-map-amap.controller';
import { SystemMapPanelControlsController } from './controller/panel/system-map-panel-controls.controller';
import { SystemMapPanelDetailsShopController } from './controller/panel/system-map-panel-details-shop.controller';
import { SystemMapPanelDetailsController } from './controller/panel/system-map-panel-details.controller';
import { SystemMapPanelEditorCircleGettingController } from './controller/panel/system-map-panel-editor-circle-getting.controller';
import { SystemMapPanelEditorCircleController } from './controller/panel/system-map-panel-editor-circle.controller';
import { SystemMapPanelEditorController } from './controller/panel/system-map-panel-editor.controller';
import { SystemMapPanelFilterController } from './controller/panel/system-map-panel-filter.controller';
import { SystemMapPanelPositionController } from './controller/panel/system-map-panel-position.controller';
import { SystemMapPanelSearchController } from './controller/panel/system-map-panel-search.controller';
import { SystemMapPanelSourceRoadController } from './controller/panel/system-map-panel-source-road.controller';
import { SystemMapPanelSourceShopController } from './controller/panel/system-map-panel-source-shop.controller';
import { SystemMapPanelSourceController } from './controller/panel/system-map-panel-source.controller';
import { SystemMapPanelStateController } from './controller/panel/system-map-panel-state.controller';
import { SystemMapPanelStatisticController } from './controller/panel/system-map-panel-statistic.controller';
import { SystemMapPanelTaskController } from './controller/panel/system-map-panel-task.controller';
import { SystemMapPanelController } from './controller/panel/system-map-panel.controller';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapWindowController } from './controller/window/system-map-window.controller';
import { SystemMapAMapTrigger } from './trigger/system-map-amap.trigger';
import { SystemMapPanelTrigger } from './trigger/system-map-panel.trigger';
import { SystemMapTrigger } from './trigger/system-map.trigger';

const SystemMapBusinessProviders = [
  SystemMapShopBusiness,
  SystemMapShopTaskBusiness,
  SystemMapShopTaskBaseBusiness,
  SystemMapShopTaskCompareBusiness,
  SystemMapRoadBusiness,
  SystemMapBusiness,
];
const SystemMapTriggerProviders = [
  SystemMapAMapTrigger,
  SystemMapPanelTrigger,
  SystemMapTrigger,
];
const SystemMapPanelProviders = [
  SystemMapPanelSourceShopController,
  SystemMapPanelSourceRoadController,
  SystemMapPanelSourceController,
  SystemMapPanelControlsController,
  SystemMapPanelStateController,
  SystemMapPanelSearchController,
  SystemMapPanelPositionController,
  SystemMapPanelDetailsShopController,
  SystemMapPanelDetailsController,
  SystemMapPanelEditorCircleController,
  SystemMapPanelEditorCircleGettingController,
  SystemMapPanelEditorController,
  SystemMapPanelFilterController,
  SystemMapPanelStatisticController,
  SystemMapPanelTaskController,
  SystemMapPanelController,
];

export const SystemMapProviders = [
  SystemMapAMapController,
  SystemMapController,
  SystemMapWindowController,

  ...SystemMapPanelProviders,
  ...SystemMapTriggerProviders,
  ...SystemMapBusinessProviders,
];
