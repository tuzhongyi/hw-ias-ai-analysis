import { EChartsOption } from 'echarts';

export const SystemEventTaskTimelineOptions: EChartsOption = {
  grid: {
    top: -10,
    height: '60px',
    left: -30,
    right: -30,
  },
  xAxis: {
    type: 'category',
    data: ['自动发现', '人员派单', '接单处置', '处置闭环'],
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#cfd7ff',
      fontSize: 16,
    },
    offset: 5,
  },

  yAxis: {
    show: false,
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: 0,
        color: '#21e452',
      },
      {
        lte: 4,
        color: '#666',
      },
    ],
  },
  series: [
    {
      type: 'line',

      label: {
        show: true,
        formatter: '{b}',
        color: '#cfd7ff',
        fontSize: 16,
      },
      lineStyle: {
        width: 4,
      },
      symbolSize: 8,
      symbol: 'circle',
      data: [],
    },
  ],
};
