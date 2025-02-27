import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { FactoryResetMode } from '../../../../common/data-core/enums/factory-reset-mode.enum';
import { ManagementSystemMaintainConfigDataComponent } from '../management-system-maintain-config-data/management-system-maintain-config-data.component';
import { ManagementSystemMaintainConfigFactoryComponent } from '../management-system-maintain-config-factory/management-system-maintain-config-factory.component';
import { ManagementSystemMaintainConfigPowerComponent } from '../management-system-maintain-config-power/management-system-maintain-config-power.component';
import { ManagementSystemMaintainConfigUpgradeComponent } from '../management-system-maintain-config-upgrade/management-system-maintain-config-upgrade.component';
import { ManagementSystemMaintainConfigBusiness } from './management-system-maintain-config.business';
import { ManagementSystemMaintainConfigWindow } from './management-system-maintain-config.window';

@Component({
  selector: 'ias-management-system-maintain-config',
  imports: [
    CommonModule,
    ManagementSystemMaintainConfigPowerComponent,
    ManagementSystemMaintainConfigFactoryComponent,
    ManagementSystemMaintainConfigDataComponent,
    ManagementSystemMaintainConfigUpgradeComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './management-system-maintain-config.component.html',
  styleUrl: './management-system-maintain-config.component.less',
  providers: [ManagementSystemMaintainConfigBusiness],
})
export class ManagementSystemMaintainConfigComponent {
  constructor(
    private business: ManagementSystemMaintainConfigBusiness,
    private toastr: ToastrService
  ) {}

  window = new ManagementSystemMaintainConfigWindow();

  power = {
    reboot: {
      confirm: () => {
        this.window.confirm.content = '确定要重启设备吗？';
        this.window.confirm.do = () => {
          this.power.reboot.do();
        };
        this.window.confirm.show = true;
      },
      do: () => {
        this.business
          .reboot()
          .then((x) => {
            this.toastr.success('重启成功');
          })
          .catch((e) => {
            this.toastr.error('重启失败');
          })
          .finally(() => {
            this.window.confirm.show = false;
          });
      },
    },
    shutdown: {
      confirm: () => {
        this.window.confirm.content = '确定要关闭设备吗？';
        this.window.confirm.do = this.power.shutdown.do.bind(this);
        this.window.confirm.show = true;
      },
      do: () => {
        this.business
          .shutdown()
          .then((x) => {
            this.toastr.success('关机成功');
          })
          .catch((e) => {
            this.toastr.error('关机失败');
          })
          .finally(() => {
            this.window.confirm.show = false;
          });
      },
    },
  };

  factory = {
    confirm: (mode: FactoryResetMode) => {
      this.window.confirm.content = '确定要恢复出厂设置吗？';
      this.window.confirm.do = () => {
        this.factory.reset(mode);
      };
      this.window.confirm.show = true;
    },
    reset: (mode: FactoryResetMode) => {
      this.business.factory
        .reset(mode)
        .then((x) => {
          this.toastr.success('恢复出厂设置成功');
        })
        .catch((e) => {
          this.toastr.error('恢复出厂设置失败');
        })
        .finally(() => {
          this.window.confirm.show = false;
        });
    },
  };

  config = {
    confirm: (data: ArrayBuffer) => {
      this.window.confirm.content = '确定要上传配置文件吗？';
      this.window.confirm.do = () => {
        this.config.do(data);
      };
      this.window.confirm.show = true;
    },
    do: (data: ArrayBuffer) => {
      this.business.config
        .upload(data)
        .then((x) => {
          this.toastr.success('上传成功');
        })
        .catch((e) => {
          this.toastr.error('上传失败');
        })
        .finally(() => {
          this.window.confirm.show = false;
        });
    },
  };

  upgrade = {
    doing: new EventEmitter<void>(),
    confirm: (data: ArrayBuffer) => {
      this.window.confirm.content = '确定要升级固件吗？';
      this.window.confirm.do = () => {
        this.upgrade.do(data);
      };
      this.window.confirm.show = true;
    },
    do: (data: ArrayBuffer) => {
      this.business
        .upgrade(data)
        .then((x) => {
          this.toastr.success('正在升级固件，请稍后');
          this.upgrade.doing.emit();
        })
        .catch((e) => {
          this.toastr.error('上传失败');
        })
        .finally(() => {
          this.window.confirm.show = false;
        });
    },
  };
}
