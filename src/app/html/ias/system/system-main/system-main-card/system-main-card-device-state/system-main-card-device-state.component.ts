import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';
import { SystemMainCardContainerComponent } from '../system-main-card-container/system-main-card-container.component';

@Component({
  selector: 'ias-system-main-card-device-state',
  imports: [CommonModule, SystemMainCardContainerComponent],
  templateUrl: './system-main-card-device-state.component.html',
  styleUrl: './system-main-card-device-state.component.less',
})
export class SystemMainCardDeviceStateComponent implements OnChanges {
  /**
   * 地图上那批设备（DeviceType = 1，见 SystemMainManagerDeviceBusiness）。
   * 卡片不再自己扫一遍全量设备：点「在线 / 离线」框出来的是地图这批标记，
   * 各扫各的会出现「卡片上 5 台离线、地图上只框出 3 台」
   */
  @Input() devices: MobileDevice[] = [];
  @Output() state = new EventEmitter<number>();

  title: string;

  constructor(private path: PathTool) {
    this.title = `${Language.DeviceName}状态`;
  }

  get background() {
    return `url(${this.path.image.card.get().state})`;
  }

  /** 初值必须是 0：以前写死 3 / 2 / 1，请求失败时会把这些占位值当成真实数字 */
  value = {
    count: 0,
    online: 0,
    offline: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devices']) {
      this.count();
    }
  }

  /**
   * 判定口径和地图点「在线 / 离线」时的筛选保持一致：
   * OnlineStatus 不是 0（含 undefined）都算离线
   */
  private count() {
    let devices = this.devices ?? [];
    let online = devices.filter((x) => x.OnlineStatus === 0).length;
    this.value.count = devices.length;
    this.value.online = online;
    this.value.offline = devices.length - online;
  }

  /** count 为 0 时不再算出 NaN% */
  get onlineWidth(): number {
    return this.value.count > 0
      ? (this.value.online / this.value.count) * 100
      : 0;
  }
  get offlineWidth(): number {
    return this.value.count > 0
      ? (this.value.offline / this.value.count) * 100
      : 0;
  }

  on = {
    state: (value: number) => {
      this.state.emit(value);
    },
  };
}
