import { Injectable } from '@angular/core';
import { DeviceDailyRouteStatistic } from '../../../../../common/data-core/models/arm/mobile-device/device-daily-route-statistic.model';
import { DeviceRoutesStatistic } from '../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import {
  GetDeviceStatementParams,
  GetMobileDeviceRoutesStatisticParams,
} from '../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../common/data-core/requests/services/system/system.service';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { ISystemStatisticDeviceRouteModel } from './system-statistic-device-route.model';

@Injectable()
export class SystemStatisticDeviceRouteBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(deviceId: string, unit: DurationUnit, date: Date) {
    switch (unit) {
      case DurationUnit.day:
        return this.history.day(deviceId, date);
      case DurationUnit.week:
        let week = DateTimeTool.all.week(new Date());
        if (DateTimeTool.math.in(date, week)) {
          return this.current.week(deviceId, date);
        }
        return this.history.week(deviceId, date);
      case DurationUnit.month:
        let month = DateTimeTool.all.month(new Date());
        if (DateTimeTool.math.in(date, month)) {
          return this.current.month(deviceId, date);
        }
        return this.history.month(deviceId, date);
      // case DurationUnit.year:
      //   return this.by.year(deviceId, date);
      default:
        return [];
    }
  }

  private current = {
    week: async (deviceId: string, date: Date) => {
      let datas: ISystemStatisticDeviceRouteModel[] = [];
      let days = DateTimeTool.full.week(date);

      for (let i = 0; i < days.length; i++) {
        let duration = DateTimeTool.all.day(days[i]);
        let item = await this.data.statistic(deviceId, duration);
        datas.push(this.convert.statistic(item));
      }
      return datas;
    },
    month: async (deviceId: string, date: Date) => {
      let datas: ISystemStatisticDeviceRouteModel[] = [];
      let days = DateTimeTool.full.month(date);

      for (let i = 0; i < days.length; i++) {
        let duration = DateTimeTool.all.day(days[i]);
        let item = await this.data.statistic(deviceId, duration);
        datas.push(this.convert.statistic(item));
      }
      return datas;
    },
  };

  private history = {
    day: async (deviceId: string, date: Date) => {
      let datas: ISystemStatisticDeviceRouteModel[] = [];
      for (let i = 0; i < 24; i++) {
        let begin = new Date(date.getTime());
        begin.setHours(i, 0, 0, 0);
        let end = new Date(date.getTime());
        end.setHours(i, 59, 59, 999);
        let item = await this.data.statistic(deviceId, { begin, end });
        datas.push(this.convert.statistic(item));
      }
      return datas;
    },
    week: async (deviceId: string, date: Date) => {
      let datas = await this.data.statements(
        deviceId,
        1,
        DateTimeTool.all.week(date)
      );
      return datas.map((x) => this.convert.statement(x));
    },
    month: async (deviceId: string, date: Date) => {
      let datas = await this.data.statements(
        deviceId,
        2,
        DateTimeTool.all.month(date)
      );
      return datas.map((x) => this.convert.statement(x));
    },
    // year: async (deviceId: string, date: Date) => {
    //   let datas: DeviceRoutesStatistic[] = [];
    //   let duration = DateTimeTool.all.year(date);
    //   for (let i = 0; i < 12; i++) {
    //     let begin = new Date(duration.begin.getTime());
    //     begin.setMonth(begin.getMonth() + i);
    //     let end = new Date(begin.getTime());
    //     end.setMonth(end.getMonth() + 1);
    //     end.setDate(0);
    //     end.setHours(23, 59, 59, 999);
    //     let item = await this.statistic(deviceId, { begin, end });
    //     datas.push(item);
    //   }
    //   return datas;
    // },
  };

  convert = {
    statistic: (data: DeviceRoutesStatisticModel) => {
      let model: ISystemStatisticDeviceRouteModel = {
        MovingSeconds: data.MovingSeconds,
        StaySeconds: data.StaySeconds,
        TotalMeters: data.TotalMeters,
        AvgSpeed: data.AvgSpeed,
        FastestSpeed: data.FastestSpeed,
        DailyMeters: data.DailyMeters,
        CoveragePercent: data.CoveragePercent,
        Date: data.BeginTime,
        Attendance: data.Attendance,
      };
      return model;
    },
    statement: (data: DeviceDailyRouteStatistic) => {
      let model: ISystemStatisticDeviceRouteModel = {
        MovingSeconds: data.MovingSeconds,
        StaySeconds: data.StaySeconds,
        TotalMeters: data.TotalMeters,
        AvgSpeed: data.AvgSpeed,
        FastestSpeed: data.FastestSpeed,
        DailyMeters: data.DailyMeters,
        CoveragePercent: data.CoveragePercent,
        Date: data.Date,
        Attendance: data.Attendance,
      };
      return model;
    },
  };

  private data = {
    statistic: (deviceId: string, duration: Duration) => {
      let params = new GetMobileDeviceRoutesStatisticParams();
      params.MobileDeviceId = deviceId;
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.MinSpeed = 3;
      return this.service.mobile.device.route
        .statistic(params)
        .then((x) => {
          let model = ObjectTool.assign(x, DeviceRoutesStatisticModel);
          model.Attendance = true;
          return model;
        })
        .catch((e) => {
          let statistic = new DeviceRoutesStatisticModel();
          statistic.BeginTime = duration.begin;
          statistic.EndTime = duration.end;
          statistic.AvgSpeed = 0;
          statistic.FastestSpeed = 0;
          statistic.MovingSeconds = 0;
          statistic.StaySeconds = 0;
          statistic.TotalMeters = 0;
          statistic.DailyMeters = 0;
          statistic.CoveragePercent = 0;
          statistic.Attendance = false;
          return statistic;
        });
    },
    statements: async (deviceId: string, type: number, duration: Duration) => {
      let params = new GetDeviceStatementParams();
      params.BeginDate = duration.begin;
      params.EndDate = duration.end;
      params.StatementType = type;
      params.DeviceId = deviceId;

      try {
        let statements = await this.service.mobile.device.statements(params);
        return statements.DailyRoutes ?? [];
      } catch (error) {
        let days = DateTimeTool.full.days(duration);
        return days.map((x) => {
          let duration = DateTimeTool.all.day(x);
          let statistic = new DeviceDailyRouteStatistic();
          statistic.Date = duration.begin;
          statistic.AvgSpeed = 0;
          statistic.FastestSpeed = 0;
          statistic.MovingSeconds = 0;
          statistic.StaySeconds = 0;
          statistic.TotalMeters = 0;
          statistic.DailyMeters = 0;
          statistic.CoveragePercent = 0;
          statistic.Attendance = false;
          return statistic;
        });
      }
    },
  };
}

class DeviceRoutesStatisticModel extends DeviceRoutesStatistic {
  Attendance?: boolean;
}
