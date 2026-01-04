import { GeoMathDirectionTool } from './geo-direction.tool';
import { GeoMathDistanceTool } from './geo-distance.tool';

export class GeoMathTool {
  direction = new GeoMathDirectionTool();
  distance = new GeoMathDistanceTool();
}
