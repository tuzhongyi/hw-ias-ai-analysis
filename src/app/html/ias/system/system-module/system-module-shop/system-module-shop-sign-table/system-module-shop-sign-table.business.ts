import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { ShopSignConverter } from '../../../../../../common/view-models/shop-sign/shop-sign.converter';

@Injectable()
export class SystemModuleShopSignTableBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private medium: MediumRequestService,
    private converter: ShopSignConverter
  ) {}

  async load(id: string) {
    let datas = await this.data(id);
    return datas.map((data) => this.converter.convert(data));
  }

  private data(id: string) {
    return this.service.shop.sign.array(id);
  }

  picture(id: string) {
    return this.medium.picture(id);
  }
}
