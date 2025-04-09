import { Injectable } from '@angular/core';
import { ResultLabelType } from '../../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { ResultLabelingParams } from '../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ShopSignConverter } from '../../../../../../common/view-models/shop-sign/shop-sign.converter';

@Injectable()
export class SystemTaskResultInfoBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private converter: ShopSignConverter
  ) {}

  load(data: ShopSign) {
    let model = this.converter.convert(data);
    return model;
  }
  shop(id: string) {
    return this.service.shop.get(id);
  }

  labeling(id: string, type: ResultLabelType) {
    let params = new ResultLabelingParams();
    params.ResultLabelType = type;
    return this.service.shop.sign.result.labeling(id, params);
  }
}
