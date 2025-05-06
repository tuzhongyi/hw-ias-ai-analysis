import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { SystemTime } from '../../../../common/data-core/models/arm/system-time.model';
import { Language } from '../../../../common/tools/language-tool/language';
import { ManagementSystemDeviceDatetimeLocalController } from './controller/management-system-device-datetime-local.controller';
import { ManagementSystemDeviceDatetimeNTPController } from './controller/management-system-device-datetime-ntp.controller';
import { ManagementSystemDeviceDatetimeController } from './controller/management-system-device-datetime.controller';
import { ManagementSystemDeviceDatetimeBusiness } from './management-system-device-datetime.business';
import { ManagementSystemDeviceDatetimeWindow } from './management-system-device-datetime.window';
import { ManagementSystemDeviceDatetimeNTPSource } from './source/management-system-device-datetime-ntp.source';
import { ManagementSystemDeviceDatetimeSource } from './source/management-system-device-datetime.source';

@Component({
  selector: 'ias-management-system-device-datetime',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    DateTimeControlComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './management-system-device-datetime.component.html',
  styleUrl: './management-system-device-datetime.component.less',
  providers: [
    ManagementSystemDeviceDatetimeBusiness,
    ManagementSystemDeviceDatetimeNTPSource,
    ManagementSystemDeviceDatetimeSource,
    ManagementSystemDeviceDatetimeLocalController,
    ManagementSystemDeviceDatetimeNTPController,
    ManagementSystemDeviceDatetimeController,
  ],
})
export class ManagementSystemDeviceDatetimeComponent implements OnInit {
  constructor(
    private business: ManagementSystemDeviceDatetimeBusiness,
    public controller: ManagementSystemDeviceDatetimeController,
    public source: ManagementSystemDeviceDatetimeSource,
    private toastr: ToastrService
  ) {}

  data = new SystemTime();
  window = new ManagementSystemDeviceDatetimeWindow();
  time = signal(Date.now());

  get check() {
    switch (this.data.TimeMode) {
      case 'NTP':
        if (!this.data.NTPServer) {
          this.toastr.error('NTP服务器未初始化');
          return false;
        }
        if (!this.data.NTPServer.HostAddress) {
          this.toastr.error('NTP服务器地址不能为空');
          return false;
        }
        if (!isFinite(this.data.NTPServer.PortNo)) {
          this.toastr.error('NTP服务器端口不能为空');
          return false;
        }
        if (!isFinite(this.data.NTPServer.SynchronizeInterval)) {
          this.toastr.error('NTP服务器更新间隔不能为空');
          return false;
        }
        break;
      case 'Manual':
        if (isNaN(this.data.LocalTime.getTime())) {
          this.toastr.warning('本地时间格式异常');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  }

  Language = Language;

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load().then((x) => {
      this.data = x;
      this.time.set(x.LocalTime.getTime());
      this.start();

      if (this.data.NTPServer) {
        this.controller.ntp.data = Object.assign(
          this.controller.ntp.data,
          this.data.NTPServer
        );
      }
    });
  }

  private start() {
    setInterval(() => {
      let time = this.time();
      time += 1000;
      this.time.set(time);
    }, 1000);
  }

  save() {
    switch (this.data.TimeMode) {
      case 'NTP':
        this.data.NTPServer = this.controller.ntp.data;
        break;
      case 'Manual':
        let date = formatDate(
          this.controller.local.date,
          Language.yyyyMMdd,
          'en'
        );
        this.data.LocalTime = new Date(`${date} ${this.controller.local.time}`);
        break;
      default:
        this.toastr.error('时间模式异常');
        return;
    }

    if (this.check) {
      this.business
        .update(this.data)
        .then((x) => {
          this.data = x;
          this.toastr.success('操作成功');
        })
        .catch((e) => {
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.window.confirm.show = false;
        });
    }
  }
}
