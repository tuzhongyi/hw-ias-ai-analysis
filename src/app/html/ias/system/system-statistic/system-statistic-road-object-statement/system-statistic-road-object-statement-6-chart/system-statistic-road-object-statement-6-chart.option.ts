export const SystemStatisticRoadObjectStatement6ChartOption: any = {
  color: ['#f3b447'],
  grid: {
    left: '0px',
    right: '0px',
    bottom: '0%',
    top: '25px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params: any) => {
      let item = params[0];
      let value = `${item.axisValue}`;
      for (let i = 0; i < params.length; i++) {
        const item = params[i];
        let marker = item.marker.replace('#000', '#f3b447');

        value += `<br />${marker} ${item.name} ${item.value}`;
      }
      return value;
      // return `${item.axisValue}<br />${params[0].marker}单位（起） ${item.data}`;
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    axisLabel: {
      color: 'rgba(255,255,255,1)',
      fontFamily: 'howell light',
      interval: 3, //5,
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    axisLine: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    splitNumber: 3,
    axisLabel: {
      color: 'rgba(255,255,255,1)',
      fontFamily: 'howell light',
    },
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
      lineStyle: {
        color: '#f3b447', // 线条颜色
        width: 2,
      },
      itemStyle: {
        color: '#000', // 圆环边框色
        borderColor: '#f3b447',
        borderWidth: 2,
      },
    },
  ],
};
