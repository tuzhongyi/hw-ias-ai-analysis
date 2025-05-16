import { instanceToPlain } from 'class-transformer';
import { MobileEventRecord } from '../../../../../models/arm/event/mobile-event-record.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmSystemUrl } from '../../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import {
  ChangeBusinessStateParams,
  CreateShopRegistrationParams,
  MarkingShopParams,
  MergeShopParams,
} from './system-event-handle.params';

export class SystemEventHandleRequestService {
  constructor(private http: HowellHttpClient) {}

  async data(id: string, data: FormData) {
    let url = ArmSystemUrl.event.handle(id).basic();
    const response = await this.http.post<
      HowellResponse<MobileEventRecord>,
      any
    >(url, data);
    return HowellResponseProcess.item(response, MobileEventRecord);
  }

  shop = {
    delete: async (id: string) => {
      let url = ArmSystemUrl.event.handle(id).shop.delete();
      const response = await this.http.post<HowellResponse<MobileEventRecord>>(
        url
      );
      return HowellResponseProcess.item(response, MobileEventRecord);
    },
    create: async (id: string, params: CreateShopRegistrationParams) => {
      let url = ArmSystemUrl.event.handle(id).shop.create();
      let plain = instanceToPlain(params);
      const response = await this.http.post<
        HowellResponse<MobileEventRecord>,
        any
      >(url, plain);
      return HowellResponseProcess.item(response, MobileEventRecord);
    },
    marking: async (id: string, params: MarkingShopParams) => {
      let url = ArmSystemUrl.event.handle(id).shop.marking();
      let plain = instanceToPlain(params);
      const response = await this.http.post<
        HowellResponse<MobileEventRecord>,
        any
      >(url, plain);
      return HowellResponseProcess.item(response, MobileEventRecord);
    },
    merge: async (id: string, params: MergeShopParams) => {
      let url = ArmSystemUrl.event.handle(id).shop.merge();
      let plain = instanceToPlain(params);
      const response = await this.http.post<
        HowellResponse<MobileEventRecord>,
        any
      >(url, plain);
      return HowellResponseProcess.item(response, MobileEventRecord);
    },
  };

  business = {
    state: {
      change: async (id: string, params: ChangeBusinessStateParams) => {
        let url = ArmSystemUrl.event.handle(id).business.state.change();
        let plain = instanceToPlain(params);
        const response = await this.http.post<
          HowellResponse<MobileEventRecord>,
          any
        >(url, plain);
        return HowellResponseProcess.item(response, MobileEventRecord);
      },
    },
  };
}
