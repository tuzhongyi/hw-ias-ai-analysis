export const AngleControlEChartOption: any = {
  tooltip: {
    show: false,
  },
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      splitNumber: 12,
      animation: false,
      radius: '100%',
      axisLine: {
        show: false,
      },
      min: 0,
      max: 360,
      detail: {
        formatter: '{value}',
      },
      axisLabel: {
        formatter: (value: number) => {
          if (value === 0) {
            return '';
          }
          return value + '';
        },
      },
      data: [{ value: 0 }],
    },
  ],
};
