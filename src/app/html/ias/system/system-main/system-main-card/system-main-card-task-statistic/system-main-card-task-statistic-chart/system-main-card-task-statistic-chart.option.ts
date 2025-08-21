import * as echarts from 'echarts';
export const SystemMainCardTaskStatisticChartOption: any = {
  grid: {
    top: '10%',
    left: '10%',
    right: '0%',
    bottom: '10%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    data: [],
    type: 'category',
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(105, 173, 255, 0.3)',
      },
    },
    axisLabel: {
      color: 'rgba(221, 244, 255, 0.5)',
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: 'rgba(105, 173, 255, 0.3)',
        type: 'dashed',
      },
    },
    axisLabel: {
      color: 'rgba(221, 244, 255, 0.5)',
    },
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#01edf5' },
          { offset: 1, color: '#73d4ff' },
        ]),
      },
      data: [],
    },
  ],
};
