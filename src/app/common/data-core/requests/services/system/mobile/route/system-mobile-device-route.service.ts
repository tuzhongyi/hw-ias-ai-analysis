import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';
import { FileGpsItem } from '../../../../../models/arm/file/file-gps-item.model';
import { DeviceRoutesStatistic } from '../../../../../models/arm/mobile-device/device-routes-statistic.model';
import { PagedList } from '../../../../../models/interface/page-list.model';
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

  list(params: GetMobileDeviceRoutesParams): Promise<PagedList<FileGpsItem>> {
    let url = ArmSystemUrl.mobile.device.route.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<FileGpsItem>>, any>(url, plain)
      .then((x) => {
        let paged = HowellResponseProcess.paged(x, FileGpsItem);
        if (paged.Page.PageCount > 0 && paged.Page.PageIndex > paged.Page.PageCount) {
          params.PageIndex = paged.Page.PageCount;
          return this.list(params);
        }
        return paged;
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
