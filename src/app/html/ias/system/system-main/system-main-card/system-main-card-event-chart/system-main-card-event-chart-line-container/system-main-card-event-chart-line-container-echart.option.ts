import * as echarts from 'echarts';
export const SystemMainCardEventChartLineEChartOption: any = {
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
    axisLine: {
      lineStyle: {
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
      color: 'rgba(255,255,255,0.7)',
      fontFamily: 'howell light',
    },
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#00ffff',
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(0,255,255,0.3)',
          },
          {
            offset: 1,
            color: 'rgba(0,255,255,0)',
          },
        ]),
      },
      markPoint: {
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#18164f',
          borderColor: '#00ffff',
          borderWidth: 2,
        },
        label: {
          offset: [0, -15],
          color: '#fff',
        },
        data: [{ type: 'max', name: 'Max' }],
      },
    },
  ],
};
