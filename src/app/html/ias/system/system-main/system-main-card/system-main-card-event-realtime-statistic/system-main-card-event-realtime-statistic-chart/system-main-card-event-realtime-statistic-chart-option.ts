export const SystemMainCardEventRealtimeStatisticChartOption: any = {
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
        { id: 1, value: 0, name: '机动车乱停' },
        { id: 2, value: 0, name: '非机动车乱停' },
        { id: 3, value: 0, name: '暴露垃圾' },
        { id: 4, value: 0, name: '道路设施损坏' },
        { id: 5, value: 0, name: '占道经营' },
        { id: 6, value: 0, name: '占道施工' },
        { id: 7, value: 0, name: '飞线充电' },
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
        { id: 1, value: 0, name: '机动车乱停' },
        { id: 2, value: 0, name: '非机动车乱停' },
        { id: 3, value: 0, name: '暴露垃圾' },
        { id: 4, value: 0, name: '道路设施损坏' },
        { id: 5, value: 0, name: '占道经营' },
        { id: 6, value: 0, name: '占道施工' },
        { id: 7, value: 0, name: '飞线充电' },
      ],
    },
  ],
};
