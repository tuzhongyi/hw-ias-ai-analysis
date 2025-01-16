import { SystemAMapController } from './controller/amap/system-map-amap.controller';
import { SystemMapPanelDetailsShopController } from './controller/panel/system-map-panel-details-shop.controller';
import { SystemMapPanelDetailsController } from './controller/panel/system-map-panel-details.controller';
import { SystemMapPanelEditorCircleController } from './controller/panel/system-map-panel-editor-circle.controller';
import { SystemMapPanelEditorController } from './controller/panel/system-map-panel-editor.controller';
import { SystemMapPanelPositionController } from './controller/panel/system-map-panel-position.controller';
import { SystemMapPanelSourceController } from './controller/panel/system-map-panel-source.controller';
import { SystemMapPanelStateController } from './controller/panel/system-map-panel-state.controller';
import { SystemMapPanelController } from './controller/panel/system-map-panel.controller';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapBusiness } from './system-map.business';

export const SystemMapProviders = [
  SystemAMapController,

  SystemMapPanelSourceController,
  SystemMapPanelStateController,

  SystemMapPanelPositionController,
  SystemMapPanelDetailsShopController,
  SystemMapPanelDetailsController,
  SystemMapPanelEditorCircleController,
  SystemMapPanelEditorController,
  SystemMapPanelController,
  SystemMapController,
  SystemMapBusiness,
];
