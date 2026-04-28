import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartType } from '../../../../../../../common/tools/chart-tool/chart.model';
import {
  ISystemStatisticDeviceRouteModel,
  SystemStatisticDeviceRouteArgs,
  SystemStatisticDeviceRouteType,
} from '../../system-statistic-device-route.model';
import { SystemStatisticDeviceRouteChartComponent } from '../system-statistic-device-route-chart/system-statistic-device-route-chart.component';

@Component({
  selector: 'ias-system-statistic-device-route-chart-container',
  imports: [CommonModule, SystemStatisticDeviceRouteChartComponent],
  templateUrl: './system-statistic-device-route-chart-container.component.html',
  styleUrl: './system-statistic-device-route-chart-container.component.less',
})
export class SystemStatisticDeviceRouteChartContainerComponent {
  @Input() datas: ISystemStatisticDeviceRouteModel[] = [];
  @Input() type = ChartType.line;
  @Input() args = new SystemStatisticDeviceRouteArgs();

  RouteStatisticType = SystemStatisticDeviceRouteType;
}
