import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import {
  ChartType,
  IChartData,
} from '../../../../../../../common/tools/chart-tool/chart.model';
import { ChartTool } from '../../../../../../../common/tools/chart-tool/chart.tool';
import { SystemMainCardEventChartLineMultipleComponent } from '../../../../system-main/system-main-card/system-main-card-event-chart/system-main-card-event-chart-line-multiple/system-main-card-event-chart-line-multiple.component';
import {
  ISystemStatisticDeviceRouteModel,
  SystemStatisticDeviceRouteArgs,
  SystemStatisticDeviceRouteType,
} from '../../system-statistic-device-route.model';
import { SystemStatisticDeviceRouteChartConverter } from './system-statistic-device-route-chart.converter';

@Component({
  selector: 'ias-system-statistic-device-route-chart',
  imports: [CommonModule, SystemMainCardEventChartLineMultipleComponent],
  templateUrl: './system-statistic-device-route-chart.component.html',
  styleUrl: './system-statistic-device-route-chart.component.less',
})
export class SystemStatisticDeviceRouteChartComponent implements OnChanges {
  @Input() charttype = ChartType.line;
  @Input() statistictype = SystemStatisticDeviceRouteType.Meter;
  @Input('datas') source: ISystemStatisticDeviceRouteModel[] = [];
  @Input() args = new SystemStatisticDeviceRouteArgs();

  constructor() {}

  private converter = new SystemStatisticDeviceRouteChartConverter();
  interval = 0;
  datas: IChartData[] = [];
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  private data = {
    load: (
      datas: ISystemStatisticDeviceRouteModel[],
      args: SystemStatisticDeviceRouteArgs,
      type: SystemStatisticDeviceRouteType
    ) => {
      this.converter.load(datas, type).then((x) => {
        this.datas = x;
        this.xAxis = ChartTool.axis.x.unit(args.unit, {
          end: true,
          date: args.date,
          first: 1,
        });

        // if (args.unit == DurationUnit.week) {
        //   this.interval = 0;
        // } else {
        //   this.interval = 1;
        // }
      });
    },
  };
  private change = {
    source: (simple: SimpleChange) => {
      if (simple) {
        this.data.load(this.source, this.args, this.statistictype);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.source(changes['source']);
  }
}
