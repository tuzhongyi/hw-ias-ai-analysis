import { instanceToPlain } from 'class-transformer';
import { Cache } from '../../../../cache/cache';
import { AbstractService } from '../../../../cache/cache.interface';
import { ShopTaskCompareResult } from '../../../../models/arm/analysis/shop-task-compare-result.model';
import { ShopRegistrationTaskDetectedResult } from '../../../../models/arm/geographic/shop-registration-task-detected-result.model';
import { ShopRegistration } from '../../../../models/arm/geographic/shop-registration.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmGeographicUrl } from '../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import {
  GetShopRegistrationTaskDetectedResultParams,
  GetShopRegistrationsParams,
  ShopTaskCompareParams,
} from './geographic-shop.params';

@Cache(ArmGeographicUrl.shop.basic(), ShopRegistration)
export class ArmGeographicShopRequestService extends AbstractService<ShopRegistration> {
  constructor(private http: HowellHttpClient) {
    super();
  }

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

  excel = {
    upload: async (
      data: ArrayBuffer,
      progress?: (x: number) => void,
      completed?: () => void
    ) => {
      let url = ArmGeographicUrl.shop.excel.upload();
      this.http
        .upload<ArrayBuffer, HowellResponse<string>>(url, data, {
          process: progress,
          completed: completed,
        })
        .then((x) => {
          if (x.FaultCode === 0) {
            return x.Data;
          }
          throw new Error(`${x.FaultCode}:${x.FaultReason}`);
        });
    },
    download: (query: { roadId?: string; oriRoadId?: string }) => {
      return ArmGeographicUrl.shop.excel.download(query);
    },
  };

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
    detected: {
      result: {
        all: async (
          params: GetShopRegistrationTaskDetectedResultParams
        ): Promise<ShopRegistrationTaskDetectedResult[]> => {
          let data: ShopRegistration[] = [];
          let index = 1;
          let paged: PagedList<ShopRegistrationTaskDetectedResult>;
          do {
            params.PageIndex = index;
            paged = await this.task.detected.result.list(params);
            data = data.concat(paged.Data);
            index++;
          } while (index <= paged.Page.PageCount);
          return data;
        },
        list: (params: GetShopRegistrationTaskDetectedResultParams) => {
          let url = ArmGeographicUrl.shop.task.detected.result();
          let plain = instanceToPlain(params);
          return this.http
            .post<
              HowellResponse<PagedList<ShopRegistrationTaskDetectedResult>>,
              any
            >(url, plain)
            .then((x) => {
              return HowellResponseProcess.paged(
                x,
                ShopRegistrationTaskDetectedResult
              );
            });
        },
      },
    },
  };
}
