import { SystemMainManagerComponent } from '../../system-main-manager.component';

export class SystemMainManagerCardDeviceState {
  show = false;

  constructor(private that: SystemMainManagerComponent) {}

  on = {
    /** 点「在线 / 离线」：把该状态的设备标记框进视野（0 在线，1 离线） */
    trigger: (value?: number) => {
      if (value == undefined) return;
      this.that.device.focus(value);
    },
  };
}
