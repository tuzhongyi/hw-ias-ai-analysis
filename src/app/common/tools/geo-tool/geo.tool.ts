import { GeoLineTool } from './geo-line.tool';
import { GeoPointTool } from './geo-point.tool';
import { GeoPolylineTool } from './geo-polyline.tool';

export class GeoTool {
  static point = new GeoPointTool();
  static polyline = new GeoPolylineTool();
  static line = new GeoLineTool();
}
