import { GeoLineTool } from './geo-line.tool';
import { GeoMathTool } from './geo-math/geo-math.tool';
import { GeoPointTool } from './geo-point.tool';
import { GeoPolylineTool } from './geo-polyline.tool';

export class GeoTool {
  static point = new GeoPointTool();
  static polyline = new GeoPolylineTool();
  static line = new GeoLineTool();
  static math = new GeoMathTool();
}
