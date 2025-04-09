import { instanceToPlain } from 'class-transformer';
import { ShopRegistration } from '../../../../models/arm/analysis/shop-registration.model';
import { ShopTaskCompareResult } from '../../../../models/arm/analysis/shop-task-compare-result.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmGeographicUrl } from '../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import {
  GetShopRegistrationsParams,
  ShopTaskCompareParams,
} from './geographic-shop.params';

export class ArmGeographicShopRequestService {
  constructor(private http: HowellHttpClient) {}

  async get(id: string) {
    let url = ArmGeographicUrl.shop.item(id);
    return this.http.get<HowellResponse<ShopRegistration>>(url).then((x) => {
      return HowellResponseProcess.item(x, ShopRegistration);
    });
  }

  async create(data: ShopRegistration) {
    let url = ArmGeographicUrl.shop.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<ShopRegistration>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, ShopRegistration);
      });
  }

  async update(data: ShopRegistration) {
    let url = ArmGeographicUrl.shop.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<ShopRegistration>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, ShopRegistration);
      });
  }
  async delete(id: string) {
    let url = ArmGeographicUrl.shop.item(id);
    return this.http.delete<HowellResponse<ShopRegistration>>(url).then((x) => {
      return HowellResponseProcess.item(x, ShopRegistration);
    });
  }

  async list(params: GetShopRegistrationsParams) {
    let url = ArmGeographicUrl.shop.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<ShopRegistration>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, ShopRegistration);
      });
  }
  async all(
    params: GetShopRegistrationsParams = new GetShopRegistrationsParams()
  ) {
    let data: ShopRegistration[] = [];
    let index = 1;
    let paged: PagedList<ShopRegistration>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  task = {
    compare: (params: ShopTaskCompareParams) => {
      let url = ArmGeographicUrl.shop.task.compare();
      let plain = instanceToPlain(params);
      return this.http
        .post<HowellResponse<ShopTaskCompareResult[]>, any>(url, plain)
        .then((x) => {
          return HowellResponseProcess.array(x, ShopTaskCompareResult);
        });
    },
  };
}
