import { Injectable } from '@angular/core';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { SystemTaskResultInfoConverter } from './system-task-result-info.converter';

@Injectable()
export class SystemTaskResultInfoBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private converter: SystemTaskResultInfoConverter
  ) {}

  load(data: ShopSign) {
    let model = this.converter.convert(data);
    return model;
  }
  shop(id: string) {
    return this.service.shop.get(id);
  }
}
