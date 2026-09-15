import { CommonModule, formatDate } from '@angular/common';
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
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { ChartType } from '../../../../../../common/tools/chart-tool/chart.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { DurationUnit } from '../../../../../../common/tools/date-time-tool/duration.model';
import { IExcelExportModel } from '../../../../../../common/tools/excel-tool/excel.model';
import { ExcelTool } from '../../../../../../common/tools/excel-tool/excel.tool';
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
    public source: SystemStatisticDeviceRouteSource,
  ) {}

  Language = Language;
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
        this.toastr.warning(`请选择${Language.DeviceName}`);
        return;
      }
      this.load.to(this.args);
    },
    export: () => {
      if (!this.datas.length) {
        this.toastr.warning('没有可导出的数据');
        return;
      }
      this.export.run();
    },
  };

  export = {
    run: () => {
      let model = this.export.convert();
      ExcelTool.export(model);
    },
    convert: (): IExcelExportModel => {
      return {
        name: this.export.name(),
        table: {
          name: '数据',
          title: this.export.title(),
          columns: [
            '日期',
            '总里程(公里)',
            '平均时速(公里/小时)',
            '最高时速(公里/小时)',
            '行驶时长(秒)',
            '停留时长(秒)',
            '覆盖率(%)',
            '是否出勤',
          ],
          rows: this.datas.map((x) => [
            this.export.date(x.Date),
            +(x.TotalMeters / 1000).toFixed(2),
            +x.AvgSpeed.toFixed(2),
            +x.FastestSpeed.toFixed(2),
            x.MovingSeconds,
            x.StaySeconds,
            +(x.CoveragePercent ?? 0).toFixed(2),
            Language.YesOrNo(x.Attendance),
          ]),
        },
        charts: [
          {
            name: '里程',
            title: '里程',
            type: this.chart.type,
            category: 0,
            series: [{ name: '总里程', color: '00F6FF', column: 1 }],
          },
          {
            name: '速度',
            title: '速度',
            type: this.chart.type,
            category: 0,
            series: [{ name: '平均时速', color: '00F6FF', column: 2 }],
          },
          {
            name: '时长',
            title: '时长',
            type: this.chart.type,
            category: 0,
            series: [
              { name: '行驶时长', color: '00F6FF', column: 4 },
              { name: '停留时长', color: 'FFFF00', column: 5 },
            ],
          },
        ],
      };
    },
    name: () => {
      let device = this.export.device();
      let type = this.export.type();
      switch (this.args.unit) {
        case DurationUnit.week:
        case DurationUnit.month:
        case DurationUnit.year: {
          let duration = DateTimeTool.all.unit(this.args.date, this.args.unit);
          return `${device}_行驶统计_${type}_${formatDate(duration.begin, 'yyyy-MM-dd', 'en')}_${formatDate(duration.end, 'yyyy-MM-dd', 'en')}`;
        }
        default:
          return `${device}_${type}`;
      }
    },
    title: () => {
      let device = this.export.device();
      let type = this.export.type();
      let duration = DateTimeTool.all.unit(this.args.date, this.args.unit);
      return `${device} 行驶统计 ${type} ${formatDate(duration.begin, 'yyyy-MM-dd HH:mm:ss', 'en')} ~ ${formatDate(duration.end, 'yyyy-MM-dd HH:mm:ss', 'en')}`;
    },
    device: () => {
      let device = this.source.devices.find((x) => x.Id === this.args.deviceId);
      return device?.Name ?? this.args.deviceId;
    },
    type: () => {
      switch (this.args.unit) {
        case DurationUnit.week:
          return '周报表';
        case DurationUnit.month:
          return '月报表';
        case DurationUnit.year:
          return '年报表';
        default:
          return '日报表';
      }
    },
    date: (date: Date) => {
      switch (this.args.unit) {
        case DurationUnit.day:
          return formatDate(date, 'yyyy-MM-dd HH:00', 'en');
        default:
          return formatDate(date, 'yyyy-MM-dd', 'en');
      }
    },
  };
}
