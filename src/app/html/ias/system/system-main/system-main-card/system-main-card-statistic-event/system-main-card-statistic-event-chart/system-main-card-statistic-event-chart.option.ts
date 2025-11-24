export const SystemMainCardStatisticEventChartOption: any = {
  color: [
    '#1e90ff',
    '#01edf5',
    '#28ce38',
    '#9d4edd',
    '#ff3b30',
    '#ff762c',
    '#ffd700',
  ],
  series: [
    {
      type: 'pie',
      radius: ['55%', '70%'],

      z: 1,
      silent: true,
      label: { show: false },
      itemStyle: {
        borderColor: '#1B1E53',
        borderWidth: 2,
      },
      data: [
        { id: 1, value: 0, name: '商铺更变' },
        { id: 2, value: 0, name: '实时事件' },
        { id: 3, value: 0, name: '定制场景' },
      ],
    },
    {
      type: 'pie',
      radius: ['70%', '85%'],

      z: 2,
      silent: true,
      label: { show: false },
      itemStyle: {
        opacity: 0.3,
        borderColor: '#1B1E53',
        borderWidth: 2,
      },
      data: [
        { id: 1, value: 0, name: '商铺更变' },
        { id: 2, value: 0, name: '实时事件' },
        { id: 3, value: 0, name: '定制场景' },
      ],
    },
  ],
};
