import { Injectable } from '@angular/core';
import { IChartData } from '../../../../../../common/tools/chart-tool/chart.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import {
  SystemModuleMobileDeviceRouteModel,
  SystemModuleMobileDeviceRouteType,
} from '../system-module-mobile-device-route.model';

@Injectable()
export class SystemModuleMobileDeviceRouteChartBusiness {
  async load(
    datas: SystemModuleMobileDeviceRouteModel[],
    type: SystemModuleMobileDeviceRouteType
  ) {
    switch (type) {
      case SystemModuleMobileDeviceRouteType.Meter:
        return this.convert.meter(datas);
      case SystemModuleMobileDeviceRouteType.Speed:
        return this.convert.speed(datas);
      case SystemModuleMobileDeviceRouteType.Time:
        return this.convert.time(datas);
      case SystemModuleMobileDeviceRouteType.CoveragePercent:
        return this.convert.coverage(datas);
      default:
        return [];
    }
  }

  private convert = {
    meter: (datas: SystemModuleMobileDeviceRouteModel[]) => {
      let data: IChartData = {
        Id: 'meter',
        Name: '总里程',
        unit: '公里',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat((x.TotalMeters / 1000).toFixed(2)),
            time: x.Date,
          };
        }),
      };
      return [data];
    },
    speed: (datas: SystemModuleMobileDeviceRouteModel[]) => {
      let fastest: IChartData = {
        Id: 'FastestSpeed',
        Name: '最高时速',
        unit: '公里/小时',
        color: ColorTool.chart.line.get(255, 255, 0),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat(x.FastestSpeed.toFixed(2)),
            time: x.Date,
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

            time: x.Date,
          };
        }),
      };
      return [avg, fastest];
    },
    time: (datas: SystemModuleMobileDeviceRouteModel[]) => {
      let move: IChartData = {
        Id: 'MovingSeconds',
        Name: '行驶时长',
        unit: '秒',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: x.MovingSeconds,
            time: x.Date,
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

            time: x.Date,
          };
        }),
      };
      stay.format = (value: number) => {
        return `${Language.Time(value, 'second')}`;
      };
      return [move, stay];
    },
    coverage: (datas: SystemModuleMobileDeviceRouteModel[]) => {
      let percent: IChartData = {
        Id: 'CoveragePercent',
        Name: '覆盖率',
        unit: '%',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: x.CoveragePercent ?? 0,
            time: x.Date,
          };
        }),
      };
      return [percent];
    },
  };
}
