import { instanceToPlain } from 'class-transformer';
import { ShopSign } from '../../../../models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../models/arm/analysis/shop.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmAnalysisUrl } from '../../../../urls/arm/analysis/analysis.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { GetShopSignsParams, GetShopsParams } from './analysis-shop.params';

export class ArmAnalysisShopRequestService {
  constructor(private http: HowellHttpClient) {}

  async get(id: string) {
    let url = ArmAnalysisUrl.shop.item(id);
    return this.http.get<HowellResponse<Shop>>(url).then((x) => {
      return HowellResponseProcess.item(x, Shop);
    });
  }
  async update(data: Shop) {
    let url = ArmAnalysisUrl.shop.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http.put<any, HowellResponse<Shop>>(url, plain).then((x) => {
      return HowellResponseProcess.item(x, Shop);
    });
  }

  async list(params: GetShopsParams) {
    let url = ArmAnalysisUrl.shop.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<Shop>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, Shop);
      });
  }
  async all(params: GetShopsParams = new GetShopsParams()) {
    let data: Shop[] = [];
    let index = 1;
    let paged: PagedList<Shop>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  private _sign?: ArmAnalysisShopSignRequestService;
  public get sign(): ArmAnalysisShopSignRequestService {
    if (!this._sign) {
      this._sign = new ArmAnalysisShopSignRequestService(this.http);
    }
    return this._sign;
  }
}
class ArmAnalysisShopSignRequestService {
  constructor(private http: HowellHttpClient) {}

  async array(shopId: string) {
    let url = ArmAnalysisUrl.shop.sign(shopId).basic();
    return this.http.get<HowellResponse<ShopSign[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, ShopSign);
    });
  }
  async get(id: string) {
    let url = ArmAnalysisUrl.shop.sign().item(id);
    return this.http.get<HowellResponse<ShopSign>>(url).then((x) => {
      return HowellResponseProcess.item(x, ShopSign);
    });
  }
  async delete(id: string) {
    let url = ArmAnalysisUrl.shop.sign().item(id);
    return this.http.delete<HowellResponse<ShopSign>>(url).then((x) => {
      return HowellResponseProcess.item(x, ShopSign);
    });
  }
  async all(params: GetShopSignsParams = new GetShopSignsParams()) {
    let data: ShopSign[] = [];
    let index = 1;
    let paged: PagedList<ShopSign>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }
  async list(params: GetShopSignsParams) {
    let url = ArmAnalysisUrl.shop.sign().list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<ShopSign>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, ShopSign);
      });
  }
}
