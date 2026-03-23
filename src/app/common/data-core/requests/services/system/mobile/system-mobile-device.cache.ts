import { LocaleCompare } from '../../../../../tools/compare-tool/compare.tool';
import { IService } from '../../../../cache/cache.interface';
import { ServiceCache } from '../../../../cache/service.cache';
import { MobileDevice } from '../../../../models/arm/mobile-device/mobile-device.model';
import { GetMobileDevicesParams } from './system-mobile-device.params';

export class SystemMobileDeviceCache extends ServiceCache<MobileDevice> {
  constructor(key: string, service: IService<MobileDevice>) {
    super(key, service, MobileDevice);
  }
  override filter(
    datas: MobileDevice[],
    params: GetMobileDevicesParams
  ): MobileDevice[] {
    if (params.Ids && params.Ids.length > 0) {
      datas = datas.filter((x) => {
        return params.Ids!.includes(x.Id);
      });
    }
    if (params.SerialNumber != undefined) {
      datas = datas.filter((x) => {
        return x.SerialNumber == params.SerialNumber;
      });
    }
    if (params.DeviceType != undefined) {
      datas = datas.filter((x) => {
        return x.DeviceType == params.DeviceType;
      });
    }
    if (params.OnlineStatus != undefined) {
      datas = datas.filter((x) => {
        return x.OnlineStatus == params.OnlineStatus;
      });
    }
    if (params.Name) {
      datas = datas.filter((x) => {
        return (x.Name ?? '')
          .toLocaleLowerCase()
          .includes((params.Name ?? '').toLocaleLowerCase());
      });
    }
    if (params.Asc) {
      datas = datas.sort((a, b) => {
        let _a = a as any;
        let _b = b as any;
        return LocaleCompare.compare(_a[params.Asc!], _b[params.Asc!], true);
      });
    } else if (params.Desc) {
      datas = datas.sort((a, b) => {
        let _a = a as any;
        let _b = b as any;
        return LocaleCompare.compare(_a[params.Desc!], _b[params.Desc!], false);
      });
    }
    return datas;
  }
}
