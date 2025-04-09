import { SystemMapRoadBusiness } from './business/road/system-map-road.business';
import { SystemMapShopBusiness } from './business/shop/system-map-shop.business';

import { SystemMapTaskBaseBusiness } from './business/task/system-map-task-base.business';
import { SystemMapTaskCompareBusiness } from './business/task/system-map-task-compare.business';

import { SystemMapShopTestBusiness } from './business/shop/system-map-shop-test.business';
import { SystemMapBusiness } from './business/system-map.business';
import { SystemMapTaskRegistrationBusiness } from './business/task/system-map-task-registration.business';
import { SystemMapTaskBusiness } from './business/task/system-map-task.business';
import { SystemMapAMapController } from './controller/amap/system-map-amap.controller';
import { SystemMapPanelDetailsShopRegistrationController } from './controller/panel/details/system-map-panel-details-shop-registration.controller';
import { SystemMapPanelDetailsShopSignController } from './controller/panel/details/system-map-panel-details-shop-sign.controller';
import { SystemMapPanelDetailsShopController } from './controller/panel/details/system-map-panel-details-shop.controller';
import { SystemMapPanelDetailsController } from './controller/panel/details/system-map-panel-details.controller';
import { SystemMapPanelSettingCompareController } from './controller/panel/setting/system-map-panel-setting-compare.controller';
import { SystemMapPanelSettingController } from './controller/panel/setting/system-map-panel-setting.controller';
import { SystemMapPanelControlsController } from './controller/panel/system-map-panel-controls.controller';
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
import { SystemMapSource } from './controller/source/system-map.source';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapWindowController } from './controller/window/system-map-window.controller';
import { SystemMapAMapTrigger } from './trigger/system-map-amap.trigger';
import { SystemMapPanelTrigger } from './trigger/system-map-panel.trigger';
import { SystemMapTrigger } from './trigger/system-map.trigger';

const SystemMapBusinessProviders = [
  SystemMapShopTestBusiness,
  SystemMapShopBusiness,
  SystemMapTaskBusiness,
  SystemMapTaskBaseBusiness,
  SystemMapTaskRegistrationBusiness,
  SystemMapTaskCompareBusiness,
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
  SystemMapPanelDetailsShopRegistrationController,
  SystemMapPanelDetailsShopSignController,
  SystemMapPanelDetailsShopController,
  SystemMapPanelDetailsController,
  SystemMapPanelEditorCircleController,
  SystemMapPanelEditorCircleGettingController,
  SystemMapPanelEditorController,
  SystemMapPanelFilterController,
  SystemMapPanelStatisticController,
  SystemMapPanelTaskController,
  SystemMapPanelController,
  SystemMapPanelSettingController,
  SystemMapPanelSettingCompareController,
];

export const SystemMapProviders = [
  SystemMapAMapController,
  SystemMapController,
  SystemMapWindowController,

  SystemMapSource,

  ...SystemMapPanelProviders,
  ...SystemMapTriggerProviders,
  ...SystemMapBusinessProviders,
];
