import { RoadObjectStatement } from '../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { IntNumber } from '../../../../../common/data-core/models/arm/int-number.model';
import { DeviceStatement } from '../../../../../common/data-core/models/arm/mobile-device/device-statement.model';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  MobileDeviceStatementModel,
  RoadObjectStatementModel,
} from './system-statistic-road-object-statement.model';

export class SystemStatisticRoadObjectStatementConverter {
  device = new DeviceStatementConverter();
  object = new RoadObjectStatementConverter();
}

class RoadObjectStatementConverter {
  state(
    source: RoadObjectStatement,
    state: EnumNameValue<number>,
    total = source.TotalNumber
  ) {
    let model = new RoadObjectStatementModel();
    model.name = state.Name;

    let number = source.ObjectStateNumbers.find(
      (x) => x.Value == state.Value
    ) as IntNumber;
    model.value = number.Number;
    model.ratio = total > 0 ? (model.value / total) * 100 : 0;
    model.ratio = Math.round(model.ratio * 100) / 100;
    return model;
  }
}

class DeviceStatementConverter {
  total(datas: DeviceStatement[]) {
    let models = datas.map((x) => this.single(x));
    let data = new MobileDeviceStatementModel();
    models.forEach((x) => {
      x.attendance.days.forEach((value, key) => {
        data.attendance.days.set(key, value);
      });
      data.distance.total += x.distance.total;
      data.duration.total += x.duration.total;
    });
    return data;
  }
  single(source: DeviceStatement) {
    let data = new MobileDeviceStatementModel();
    data.id = source.DeviceId;
    data.name = source.DeviceName;
    if (source.DailyRoutes) {
      source.DailyRoutes.forEach((x) => {
        data.attendance.days.set(x.Date.getDate(), x.Attendance);
        data.distance.total += x.TotalMeters;
        data.duration.total += x.MovingSeconds;
      });
    }
    return data;
  }
}
