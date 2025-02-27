import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { DeviceInfo } from '../../../../common/data-core/models/arm/device-info.model';
import { Language } from '../../../../common/tools/language';
import { ManagementSystemDeviceInfoBusiness } from './management-system-device-info.business';
import { ManagementSystemDeviceInfoWindow } from './management-system-device-info.window';

@Component({
  selector: 'ias-management-system-device-info',
  imports: [CommonModule, FormsModule, DatePipe, WindowConfirmComponent],
  templateUrl: './management-system-device-info.component.html',
  styleUrl: './management-system-device-info.component.less',
  providers: [ManagementSystemDeviceInfoBusiness],
})
export class ManagementSystemDeviceInfoComponent implements OnInit {
  constructor(
    private business: ManagementSystemDeviceInfoBusiness,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.load();
  }

  data = new DeviceInfo();
  window = new ManagementSystemDeviceInfoWindow();

  get check() {
    if (!this.data.Name) {
      this.toastr.error('设备名称不能为空');
      return false;
    }
    return true;
  }

  Language = Language;

  load() {
    this.business
      .load()
      .then((x) => {
        this.data = x;
      })
      .catch((e) => {
        this.toastr.error('获取设备信息失败');
      });
  }
  save() {
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
