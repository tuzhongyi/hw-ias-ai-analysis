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
import { SystemMapPanelSourceController } from './controller/panel/system-map-panel-source.controller';
import { SystemMapPanelStateController } from './controller/panel/system-map-panel-state.controller';
import { SystemMapPanelStatisticController } from './controller/panel/system-map-panel-statistic.controller';
import { SystemMapPanelController } from './controller/panel/system-map-panel.controller';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapBusiness } from './system-map.business';
import { SystemMapAMapTrigger } from './trigger/system-map-amap.trigger';
import { SystemMapPanelTrigger } from './trigger/system-map-panel.trigger';
import { SystemMapTrigger } from './trigger/system-map.trigger';

export const SystemMapProviders = [
  SystemMapAMapController,

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
  SystemMapPanelController,
  SystemMapController,
  SystemMapBusiness,

  SystemMapAMapTrigger,
  SystemMapPanelTrigger,
  SystemMapTrigger,
];
