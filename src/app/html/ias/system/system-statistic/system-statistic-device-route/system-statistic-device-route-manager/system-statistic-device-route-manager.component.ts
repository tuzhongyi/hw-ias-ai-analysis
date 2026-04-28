import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { TimeControlComponent } from '../../../../../../common/components/time-control/time-control.component';
import { TimelineComponent } from '../../../../../../common/components/timeline/timeline.component';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { ChartType } from '../../../../../../common/tools/chart-tool/chart.model';
import { DurationUnit } from '../../../../../../common/tools/date-time-tool/duration.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticDeviceRouteChartContainerComponent } from '../system-statistic-device-route-chart/system-statistic-device-route-chart-container/system-statistic-device-route-chart-container.component';
import { SystemStatisticDeviceRouteInfoComponent } from '../system-statistic-device-route-info/system-statistic-device-route-info.component';
import { SystemStatisticDeviceRouteBusiness } from '../system-statistic-device-route.business';
import {
  ISystemStatisticDeviceRouteModel,
  SystemStatisticDeviceRouteArgs,
} from '../system-statistic-device-route.model';
import { SystemStatisticDeviceRouteSource } from '../system-statistic-device-route.source';

@Component({
  selector: 'ias-system-statistic-device-route-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    TimeControlComponent,
    TimelineComponent,
    HowellSelectComponent,
    SystemStatisticDeviceRouteInfoComponent,
    SystemStatisticDeviceRouteChartContainerComponent,
  ],
  templateUrl: './system-statistic-device-route-manager.component.html',
  styleUrl: './system-statistic-device-route-manager.component.less',
  providers: [
    SystemStatisticDeviceRouteSource,
    SystemStatisticDeviceRouteBusiness,
  ],
})
export class SystemStatisticDeviceRouteManagerComponent
  implements OnChanges, OnInit
{
  @Input() deviceId?: string;
  @Input() iswindow = false;

  constructor(
    private toastr: ToastrService,
    private business: SystemStatisticDeviceRouteBusiness,
    public source: SystemStatisticDeviceRouteSource
  ) {}

  Unit = DurationUnit;
  ChartType = ChartType;

  args = new SystemStatisticDeviceRouteArgs();
  datas: ISystemStatisticDeviceRouteModel[] = [];

  date = {
    value: new Date(),
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
  };
  chart = {
    type: ChartType.bar,
    Type: ChartType,
    datas: [] as ISystemStatisticDeviceRouteModel[],
  };

  private change = {
    deviceId: (simple: SimpleChange) => {
      if (simple) {
        if (this.deviceId) {
          this.args.deviceId = this.deviceId;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.deviceId(changes['deviceId']);
  }

  ngOnInit(): void {
    if (this.args.deviceId) {
      setTimeout(() => {
        this.load.to(this.args);
      }, 100);
    }
  }

  load = {
    ing: false,
    ed: false,
    to: (args: SystemStatisticDeviceRouteArgs) => {
      this.load.ing = true;
      this.business
        .load(args.deviceId, args.unit, args.date)
        .then((x) => {
          this.datas = x;
        })
        .finally(() => {
          this.load.ing = false;
          this.load.ed = true;
        });
    },
  };

  on = {
    unit: () => {
      this.date.week = this.args.unit == DurationUnit.week;
      switch (this.args.unit) {
        case DurationUnit.month:
          this.date.view.min = DateTimePickerView.year;
          this.date.format = Language.YearMonth;
          break;
        case DurationUnit.year:
          this.date.view.min = DateTimePickerView.decade;
          this.date.format = Language.Year;
          break;

        default:
          this.date.view.min = DateTimePickerView.month;
          this.date.format = Language.YearMonthDay;
          break;
      }
      this.on.search();
    },
    search: () => {
      if (!this.args.deviceId) {
        this.toastr.warning('请选择巡逻车辆');
        return;
      }
      this.load.to(this.args);
    },
  };
}
