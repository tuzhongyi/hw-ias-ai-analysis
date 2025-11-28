import { ChartAxisTool } from './axis/chart-axis.tool';
import { ChartColorTool } from './chart-color.tool';

export class ChartTool {
  static axis = new ChartAxisTool();
  static color = new ChartColorTool();
}
