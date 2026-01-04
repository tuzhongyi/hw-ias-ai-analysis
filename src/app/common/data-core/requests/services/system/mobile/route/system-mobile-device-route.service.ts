import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';
import { FileGpsItem } from '../../../../../models/arm/file/file-gps-item.model';
import { DeviceRoutesStatistic } from '../../../../../models/arm/mobile-device/device-routes-statistic.model';
import { PagedList } from '../../../../../models/page-list.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmSystemUrl } from '../../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import {
  GetMobileDeviceRoutesParams,
  GetMobileDeviceRoutesStatisticParams,
} from '../system-mobile-device.params';

export class SystemMobileDeviceRouteRequestService {
  constructor(private http: HowellHttpClient) {}

  list(params: GetMobileDeviceRoutesParams) {
    let url = ArmSystemUrl.mobile.device.route.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<FileGpsItem>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, FileGpsItem);
      });
  }

  all(params: GetMobileDeviceRoutesParams) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  statistic(params: GetMobileDeviceRoutesStatisticParams) {
    let url = ArmSystemUrl.mobile.device.route.statistic();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<DeviceRoutesStatistic>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, DeviceRoutesStatistic);
      });
  }
}
