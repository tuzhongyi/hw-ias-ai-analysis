import { LocalStorage } from '../../storage/local.storage';
import { PathImageCardTool } from './path-image-card.tool';
import { PathImageChartTool } from './path-image-chart.tool';
import { PathImageSVGTool } from './path-image-svg.tool';
import { PathImageSystemModuleTool } from './path-image-sytem-module/path-image-system-module.tool';
import { MapPath } from './path-map/map.path';

export class PathImageTool {
  constructor(private local?: LocalStorage) {
    this.card = new PathImageCardTool(local);
    this.map = new MapPath('', local);
  }

  // map = new PathImageMapTool();
  map: MapPath;
  chart = new PathImageChartTool();
  svg = new PathImageSVGTool();

  system = {
    module: new PathImageSystemModuleTool(),
  };

  card: PathImageCardTool;
}
