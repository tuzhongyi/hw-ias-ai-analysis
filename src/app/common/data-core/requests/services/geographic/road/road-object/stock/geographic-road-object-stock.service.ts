import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../../../tools/service-tool/service.tool';
import { RoadObjectStock } from '../../../../../../models/arm/geographic/road-object-stock.model';
import { PagedList } from '../../../../../../models/interface/page-list.model';
import { HowellResponse } from '../../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../../service-process';
import { GetRoadObjectStocksParams } from './geographic-road-object-stock.params';

export class ArmGeographicRoadObjectStockRequestService {
  constructor(private http: HowellHttpClient) {}

  all(params: GetRoadObjectStocksParams): Promise<RoadObjectStock[]> {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  async get(id: string) {
    let url = ArmGeographicUrl.road.object.stock().item(id);
    return this.http.get<HowellResponse<RoadObjectStock>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadObjectStock);
    });
  }

  /** 创建道路部件待入数据（Form-Data） */
  async create(stock: RoadObjectStock, image: ArrayBuffer) {
    let url = ArmGeographicUrl.road.object.stock().basic();
    let data = this.convert({ stock, image });
    return this.http
      .post<HowellResponse<RoadObjectStock>, any>(url, data)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadObjectStock);
      });
  }

  private convert(args: {
    stock: RoadObjectStock;
    image: ArrayBuffer;
  }): FormData {
    let data = new FormData();

    let json = JSON.stringify(instanceToPlain(args.stock));
    data.append('json', json);

    let image = new Blob([args.image]);
    data.append('image', image);

    return data;
  }

  async update(data: RoadObjectStock) {
    let url = ArmGeographicUrl.road.object.stock().item(data.Id!);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<RoadObjectStock>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadObjectStock);
      });
  }

  async delete(id: string) {
    let url = ArmGeographicUrl.road.object.stock().item(id);
    return this.http.delete<HowellResponse<RoadObjectStock>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadObjectStock);
    });
  }

  async list(
    params: GetRoadObjectStocksParams,
  ): Promise<PagedList<RoadObjectStock>> {
    let url = ArmGeographicUrl.road.object.stock().list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<RoadObjectStock>>, any>(url, plain)
      .then((x) => {
        let paged = HowellResponseProcess.paged(x, RoadObjectStock);
        if (
          paged.Page.PageCount > 0 &&
          paged.Page.PageIndex > paged.Page.PageCount
        ) {
          params.PageIndex = paged.Page.PageCount;
          return this.list(params);
        }
        return paged;
      });
  }
}
