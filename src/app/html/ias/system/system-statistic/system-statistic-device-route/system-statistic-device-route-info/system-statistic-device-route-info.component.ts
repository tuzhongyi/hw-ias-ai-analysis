import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { DurationUnit } from '../../../../../../common/tools/date-time-tool/duration.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import {
  ISystemStatisticDeviceRouteInfo,
  ISystemStatisticDeviceRouteModel,
} from '../system-statistic-device-route.model';

@Component({
  selector: 'ias-system-statistic-device-route-info',
  imports: [CommonModule],
  templateUrl: './system-statistic-device-route-info.component.html',
  styleUrl: './system-statistic-device-route-info.component.less',
})
export class SystemStatisticDeviceRouteInfoComponent implements OnChanges {
  @Input()
  datas: ISystemStatisticDeviceRouteModel[] = [];
  @Input() unit: DurationUnit = DurationUnit.day;

  constructor() {}

  Unit = DurationUnit;

  data?: ISystemStatisticDeviceRouteInfo;
  JSON = JSON;

  private change = {
    datas: (change: SimpleChange) => {
      if (change) {
        this.load(this.datas);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }

  private load(datas: ISystemStatisticDeviceRouteModel[]) {
    let total = {
      TotalMeters: 0,
      AvgSpeed: 0,
      FastestSpeed: 0,
      MovingSeconds: 0,
      StaySeconds: 0,
      CoveragePercent: 0,
      Attendance: 0,
    };
    datas.forEach((x) => {
      total.TotalMeters += x.TotalMeters;
      total.AvgSpeed += x.AvgSpeed;
      total.FastestSpeed += x.FastestSpeed;
      total.MovingSeconds += x.MovingSeconds;
      total.StaySeconds += x.StaySeconds;
      total.CoveragePercent += x.CoveragePercent ?? 0;
      total.Attendance += x.Attendance ? 1 : 0;
    });
    this.data = {
      TotalMeters: `${(total.TotalMeters / 1000).toFixed(2)}`,
      AvgSpeed: `${total.AvgSpeed.toFixed(2)}`,
      FastestSpeed: `${total.FastestSpeed.toFixed(2)}`,
      MovingTime: `${Language.Time(total.MovingSeconds)}`,
      StayTime: `${Language.Time(total.StaySeconds)}`,
      CoveragePercent: `${(total.CoveragePercent ?? 0).toFixed(2)}`,
      Attendance: total.Attendance || undefined,
    };
  }
}
