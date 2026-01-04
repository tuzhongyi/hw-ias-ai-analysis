import { Injectable } from '@angular/core';
import { DeviceRoutesStatistic } from '../../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import { IChartData } from '../../../../../../common/tools/chart-tool/chart.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemModuleMobileDeviceRouteType } from '../system-module-mobile-device-route.model';

@Injectable()
export class SystemModuleMobileDeviceRouteChartBusiness {
  async load(
    datas: DeviceRoutesStatistic[],
    type: SystemModuleMobileDeviceRouteType
  ) {
    switch (type) {
      case SystemModuleMobileDeviceRouteType.Meter:
        return this.convert.meter(datas);
      case SystemModuleMobileDeviceRouteType.Speed:
        return this.convert.speed(datas);
      case SystemModuleMobileDeviceRouteType.Time:
        return this.convert.time(datas);
      default:
        return [];
    }
  }

  private convert = {
    meter: (datas: DeviceRoutesStatistic[]) => {
      let data: IChartData = {
        Id: 'meter',
        Name: '总里程',
        unit: '公里',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat((x.TotalMeters / 1000).toFixed(2)),
            time: x.BeginTime,
          };
        }),
      };
      return [data];
    },
    speed: (datas: DeviceRoutesStatistic[]) => {
      let fastest: IChartData = {
        Id: 'FastestSpeed',
        Name: '最高时速',
        unit: '公里/小时',
        color: ColorTool.chart.line.get(255, 255, 0),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat(x.FastestSpeed.toFixed(2)),
            time: x.BeginTime,
          };
        }),
      };
      let avg: IChartData = {
        Id: 'AvgSpeed',
        Name: '平均时速',
        unit: '公里/小时',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat(x.AvgSpeed.toFixed(2)),

            time: x.BeginTime,
          };
        }),
      };
      return [avg, fastest];
    },
    time: (datas: DeviceRoutesStatistic[]) => {
      let move: IChartData = {
        Id: 'MovingSeconds',
        Name: '行驶时长',
        unit: '秒',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: x.MovingSeconds,
            time: x.BeginTime,
          };
        }),
      };
      move.format = (value: number) => {
        return `${Language.Time(value, 'second')}`;
      };
      let stay: IChartData = {
        Id: 'StaySeconds',
        Name: '停留时长',
        unit: '秒',
        color: ColorTool.chart.line.get(255, 255, 0),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: x.StaySeconds,

            time: x.BeginTime,
          };
        }),
      };
      stay.format = (value: number) => {
        return `${Language.Time(value, 'second')}`;
      };
      return [move, stay];
    },
  };
}
