export const SystemStatisticRoadObjectStatement4ChartOption: any = {
  color: [
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.6)',
  ],
  tooltip: {
    trigger: 'item',
  },
  legend: {
    show: false,
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
      label: {
        show: true,
        position: 'center',
        color: '#fff',
        fontSize: 30,
        textBorderWidth: 0,

        formatter: function (e: any) {
          console.log(e);
          return 1500;
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      silent: true,
      data: [
        { value: 0, name: '未检测部件' },
        { value: 0, name: '正常部件' },
        { value: 0, name: '异常部件' },
        { value: 0, name: '消失部件' },
      ],
    },
  ],
};
