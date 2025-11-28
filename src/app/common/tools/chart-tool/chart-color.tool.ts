import * as echarts from 'echarts';
import { ColorTool } from '../color/color.tool';
import { IChartColor } from './chart.model';

export class ChartColorTool {
  get(hex: string, alpha: number = 0.3) {
    let rgb = ColorTool.hex.to.rgb(hex);
    let color: IChartColor = {
      line: hex,
      area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: `rgba(${rgb.R},${rgb.G},${rgb.B},${alpha})`,
        },
        {
          offset: 1,
          color: 'rgba(0,0,0,0)',
        },
      ]),
      point: {
        border: hex,
      },
    };
    return color;
  }
}
