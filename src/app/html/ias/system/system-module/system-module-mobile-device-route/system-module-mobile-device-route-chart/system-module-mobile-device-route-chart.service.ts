import { DeviceRoutesStatistic } from '../../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { TimeUnit } from '../../../../../../common/tools/date-time-tool/date-time-tool.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export class SystemModuleMobileDeviceRouteChartService {
  constructor(private service: ArmSystemRequestService) {}

  async load(deviceId: string, unit: TimeUnit, date: Date) {
    switch (unit) {
      case TimeUnit.day:
        return this.by.day(deviceId, date);
      case TimeUnit.week:
        return this.by.week(deviceId, date);
      case TimeUnit.month:
        return this.by.month(deviceId, date);
      case TimeUnit.year:
        return this.by.year(deviceId, date);
      default:
        return [];
    }
  }

  private by = {
    day: async (deviceId: string, date: Date) => {
      let datas: DeviceRoutesStatistic[] = [];
      for (let i = 0; i < 24; i++) {
        let begin = new Date(date.getTime());
        begin.setHours(i, 0, 0, 0);
        let end = new Date(date.getTime());
        end.setHours(i, 59, 59, 999);
        let item = await this.statistic(deviceId, { begin, end });
        datas.push(item);
      }
      return datas;
    },
    week: async (deviceId: string, date: Date) => {
      let datas: DeviceRoutesStatistic[] = [];
      let duration = DateTimeTool.all.week(date);
      for (let i = 0; i < 7; i++) {
        let begin = new Date(duration.begin.getTime());
        begin.setDate(begin.getDate() + i);
        let end = new Date(begin.getTime());
        end.setHours(23, 59, 59, 999);
        let item = await this.statistic(deviceId, { begin, end });
        datas.push(item);
      }
      return datas;
    },
    month: async (deviceId: string, date: Date) => {
      let datas: DeviceRoutesStatistic[] = [];
      let duration = DateTimeTool.all.month(date);
      let last = duration.end.getDate();
      for (let i = 0; i < last; i++) {
        let begin = new Date(duration.begin.getTime());
        begin.setDate(begin.getDate() + i);
        let end = new Date(begin.getTime());
        end.setHours(23, 59, 59, 999);
        let item = await this.statistic(deviceId, { begin, end });
        datas.push(item);
      }
      return datas;
    },
    year: async (deviceId: string, date: Date) => {
      let datas: DeviceRoutesStatistic[] = [];
      let duration = DateTimeTool.all.year(date);
      for (let i = 0; i < 12; i++) {
        let begin = new Date(duration.begin.getTime());
        begin.setMonth(begin.getMonth() + i);
        let end = new Date(begin.getTime());
        end.setMonth(end.getMonth() + 1);
        end.setDate(0);
        end.setHours(23, 59, 59, 999);
        let item = await this.statistic(deviceId, { begin, end });
        datas.push(item);
      }
      return datas;
    },
  };

  private statistic(deviceId: string, duration: Duration) {
    let params = new GetMobileDeviceRoutesStatisticParams();
    params.MobileDeviceId = deviceId;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.MinSpeed = 3;
    return this.service.mobile.device.route.statistic(params).catch((e) => {
      let statistic = new DeviceRoutesStatistic();
      statistic.BeginTime = duration.begin;
      statistic.EndTime = duration.end;
      statistic.AvgSpeed = 0;
      statistic.FastestSpeed = 0;
      statistic.MovingSeconds = 0;
      statistic.StaySeconds = 0;
      statistic.TotalMeters = 0;
      return statistic;
    });
  }
}
