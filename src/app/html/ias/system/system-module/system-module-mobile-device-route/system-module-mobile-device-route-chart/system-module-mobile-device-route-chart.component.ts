import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import { DeviceRoutesStatistic } from '../../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import {
  ChartType,
  IChartData,
} from '../../../../../../common/tools/chart-tool/chart.model';
import { ChartTool } from '../../../../../../common/tools/chart-tool/chart.tool';
import { DurationUnit } from '../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardEventChartLineMultipleComponent } from '../../../system-main/system-main-card/system-main-card-event-chart/system-main-card-event-chart-line-multiple/system-main-card-event-chart-line-multiple.component';
import {
  SystemModuleMobileDeviceRouteArgs,
  SystemModuleMobileDeviceRouteType,
} from '../system-module-mobile-device-route.model';
import { SystemModuleMobileDeviceRouteChartBusiness } from './system-module-mobile-device-route-chart.business';

@Component({
  selector: 'howell-system-module-mobile-device-route-chart',
  imports: [CommonModule, SystemMainCardEventChartLineMultipleComponent],
  templateUrl: './system-module-mobile-device-route-chart.component.html',
  styleUrl: './system-module-mobile-device-route-chart.component.less',
  providers: [SystemModuleMobileDeviceRouteChartBusiness],
})
export class SystemModuleMobileDeviceRouteChartComponent implements OnChanges {
  @Input() charttype = ChartType.line;
  @Input() statistictype = SystemModuleMobileDeviceRouteType.Meter;
  @Input('datas') source: DeviceRoutesStatistic[] = [];
  @Input() args = new SystemModuleMobileDeviceRouteArgs();

  constructor(private business: SystemModuleMobileDeviceRouteChartBusiness) {}

  interval = 1;
  datas: IChartData[] = [];
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  private data = {
    load: (
      datas: DeviceRoutesStatistic[],
      args: SystemModuleMobileDeviceRouteArgs,
      type: SystemModuleMobileDeviceRouteType
    ) => {
      this.business.load(datas, type).then((x) => {
        this.datas = x;
        this.xAxis = ChartTool.axis.x.unit(args.unit, {
          end: true,
          date: args.date,
          first: 1,
        });

        if (args.unit == DurationUnit.week) {
          this.interval = 0;
        } else {
          this.interval = 1;
        }
      });
    },
  };
  private change = {
    source: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.data.load(this.source, this.args, this.statistictype);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.source(changes['source']);
  }
}
