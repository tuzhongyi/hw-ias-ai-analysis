import * as echarts from 'echarts';
export class ColorChartLineTool {
  record: ColorChartLineRecordTool;
  constructor() {
    this.record = new ColorChartLineRecordTool(this);
  }
  get(r: number, g: number, b: number) {
    return {
      area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: `rgba(${r}, ${g}, ${b}, 0.7)`,
        },
        {
          offset: 1,
          color: `rgba(${r}, ${g}, ${b}, 0)`,
        },
      ]),
      line: `rgba(${r}, ${g}, ${b}, 1)`,
      point: {
        border: `rgba(${r}, ${g}, ${b}, 1)`,
        background: '#18164f',
      },
    };
  }
}

class ColorChartLineRecordTool {
  constructor(private tool: ColorChartLineTool) {}

  get mixedinto() {
    return this.tool.get(255, 0, 240);
  }
  get garbagefull() {
    return this.tool.get(255, 255, 0);
  }
  get illegaldrop() {
    return this.tool.get(0, 246, 255);
  }
  get garbagedrop() {
    return this.tool.get(255, 140, 0);
  }
  get illegaldump() {
    return this.tool.get(182, 54, 253);
  }
  get illegalvehicle() {
    return this.tool.get(247, 61, 61);
  }
  get ias() {
    return this.tool.get(0, 179, 255);
  }
}
