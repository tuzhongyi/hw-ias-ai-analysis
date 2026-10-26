import { GetMobileDevicesParams } from '../../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

export class SystemMainManagerDeviceBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load() {
    let params = new GetMobileDevicesParams();
    params.DeviceType = 1;
    /**
     * all() 是逐页串行取的，每页一次独立请求。设备上下线会改变默认排序，
     * 页与页之间就会重复 / 漏设备（主页面卡片的在线 / 离线数跟着抖）。
     * 按 Id 升序固定排序，分页扫描才稳定。只在这个上层落点加，
     * 不改 service，避免影响其它复用 all() 的地方
     */
    params.Asc = 'Id';
    return this.service.mobile.device.all(params);
  }

  channels(deviceId: string) {
    return this.service.mobile.device.channels(deviceId);
  }
}
