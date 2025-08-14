import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../common/components/hw-select/select-control.component';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { UserGroup } from '../../../../../common/data-core/models/user/user-group.model';
import { TextSpaceBetweenDirective } from '../../../../../common/directives/text-space-between/text-space-between.directive';
import { Language } from '../../../../../common/tools/language-tool/language';
import { IASMapComponent } from '../../../share/map/ias-map.component';
import { ManagementDeviceMobileInformationBusiness } from './business/management-device-mobile-information.business';

@Component({
  selector: 'ias-management-device-mobile-information',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    IASMapComponent,
    HowellSelectComponent,
  ],
  templateUrl: './management-device-mobile-information.component.html',
  styleUrl: './management-device-mobile-information.component.less',
  providers: [ManagementDeviceMobileInformationBusiness],
})
export class ManagementDeviceMobileInformationComponent implements OnInit {
  @Input('data') device?: MobileDevice;
  @Output() ok = new EventEmitter<MobileDevice>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: ManagementDeviceMobileInformationBusiness,
    private toastr: ToastrService
  ) {}

  data = new MobileDevice();
  Language = Language;

  ngOnInit(): void {
    this.init(this.device);
  }

  private init(data?: MobileDevice) {
    if (data) {
      this.data = Object.assign(new MobileDevice(), data);
    } else {
      this.data.DeviceType = 1;
      this.data.CreationTime = new Date();
      this.data.UpdateTime = new Date();
    }
    this.business.user.group().then((group) => {
      this.group.source = group;
      if (data) {
        this.group.selected = group.find((x) => x.GroupId === data.GroupId);
      }
    });
  }

  group = {
    source: [] as UserGroup[],
    selected: undefined as UserGroup | undefined,
    change: () => {
      if (this.group.selected) {
        this.data.GroupId = this.group.selected.GroupId;
        this.data.GroupName = this.group.selected.GroupName;
      }
    },
  };

  on = {
    ok: () => {
      if (this.check) {
        let promise: Promise<MobileDevice>;
        if (this.device) {
          promise = this.business.update(this.data);
        } else {
          promise = this.business.create(this.data);
        }
        promise
          .then((x) => {
            this.toastr.success('操作成功');
            this.ok.emit(x);
          })
          .catch((x) => {
            this.toastr.error('操作失败');
          });
      }
    },
    cancel: () => {
      this.close.emit();
    },
  };

  get check() {
    if (!this.data.Name) {
      this.toastr.warning('请输入设备名称');
      return false;
    }
    if (!this.data.SerialNumber) {
      this.toastr.warning('请输入设备序列号');
      return false;
    }
    if (!this.data.GroupId) {
      this.toastr.warning('请选择用户分组');
      return false;
    }
    return true;
  }
}
