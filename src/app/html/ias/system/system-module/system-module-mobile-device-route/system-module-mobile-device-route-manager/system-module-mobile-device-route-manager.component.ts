import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
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
import { DurationUnit } from '../../../../../../common/tools/date-time-tool/duration.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemModuleMobileDeviceRouteChartContainerComponent } from '../system-module-mobile-device-route-chart-container/system-module-mobile-device-route-chart-container.component';
import { SystemModuleMobileDeviceRouteInfoComponent } from '../system-module-mobile-device-route-info/system-module-mobile-device-route-info.component';
import { SystemModuleMobileDeviceRouteMapSettingsComponent } from '../system-module-mobile-device-route-map-settings/system-module-mobile-device-route-map-settings.component';
import { SystemModuleMobileDeviceRouteMapComponent } from '../system-module-mobile-device-route-map/system-module-mobile-device-route-map.component';
import {
  SystemModuleMobileDeviceRouteArgs,
  SystemModuleMobileDeviceRouteType,
} from '../system-module-mobile-device-route.model';
import { SystemModuleMobileDeviceRouteManagerSource } from './system-module-mobile-device-route-manager.source';

@Component({
  selector: 'ias-system-module-mobile-device-route-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SystemModuleMobileDeviceRouteMapComponent,
    SystemModuleMobileDeviceRouteMapSettingsComponent,
    SystemModuleMobileDeviceRouteInfoComponent,
    SystemModuleMobileDeviceRouteChartContainerComponent,
  ],
  templateUrl: './system-module-mobile-device-route-manager.component.html',
  styleUrl: './system-module-mobile-device-route-manager.component.less',
  providers: [SystemModuleMobileDeviceRouteManagerSource],
})
export class SystemModuleMobileDeviceRouteManagerComponent
  implements OnChanges, OnInit
{
  @Input() deviceId?: string;
  @Input() iswindow = false;
  constructor(
    private toastr: ToastrService,
    public source: SystemModuleMobileDeviceRouteManagerSource
  ) {}

  args = new SystemModuleMobileDeviceRouteArgs();
  load = new EventEmitter<SystemModuleMobileDeviceRouteArgs>();
  loaded = false;
  rectified = false;
  Unit = DurationUnit;
  RouteStatisticType = SystemModuleMobileDeviceRouteType;
  date = {
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
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
        this.load.emit(this.args);
      }, 100);
    }
  }

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
      this.load.emit(this.args);
    },
    loaded: () => {
      this.loaded = true;
    },
  };
}
