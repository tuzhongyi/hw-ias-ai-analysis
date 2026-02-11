export const SystemMainCardEventChartBarEChartOption: any = {
  grid: {
    left: '10px',
    right: '9px',
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
        value += `<br />${item.marker} ${item.name} ${item.value}`;
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
    axisBar: {
      barStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    axisLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontFamily: 'howell light',
      interval: 3, //5,
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    axisBar: {
      show: false,
    },
    splitBar: {
      barStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    splitNumber: 3,
    axisLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontFamily: 'howell light',
    },
  },
  series: [
    {
      data: [],
      type: 'bar',
      smooth: true,
      symbol: 'none',
      barStyle: {
        color: '#00ffff',
        width: 2,
      },
    },
  ],
};
