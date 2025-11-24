import { instanceToPlain } from 'class-transformer';
import { EventNumberStatistic } from '../../../../../models/arm/event/event-number-statistic.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmSystemUrl } from '../../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import { GetEventNumbersParams } from './system-event-number.params';

export class SystemEventNumberRequestService {
  constructor(private http: HowellHttpClient) {}

  statistic(params: GetEventNumbersParams) {
    let url = ArmSystemUrl.event.number().statistic();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<EventNumberStatistic[]>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.array(x, EventNumberStatistic);
      });
  }
}
