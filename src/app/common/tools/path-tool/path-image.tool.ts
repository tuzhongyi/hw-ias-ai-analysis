import { PathImageChartTool } from './path-image-chart.tool';
import { PathImageMapTool } from './path-image-map.tool';

export class PathImageTool {
  map = new PathImageMapTool();
  chart = new PathImageChartTool();
}
