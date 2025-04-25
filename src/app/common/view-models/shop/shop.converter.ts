import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../data-core/models/arm/analysis/shop-registration.model';
import { IShop } from '../../data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../data-core/models/arm/analysis/shop.model';
import { ArmAnalysisRequestService } from '../../data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../data-core/requests/services/analysis/server/analysis-server.params';
import { LanguageTool } from '../../tools/language.tool';
import {
  IShopViewModel,
  ShopRegistrationViewModel,
  ShopViewModel,
} from './shop.view-model';

@Injectable({
  providedIn: 'root',
})
export class ShopConverter {
  constructor(
    private language: LanguageTool,
    private analysis: ArmAnalysisRequestService
  ) {}
  convert<T extends IShop>(data: T): IShopViewModel {
    if (data instanceof Shop) {
      return this.shop(data);
    } else {
      return this.registration(data);
    }
  }

  private shop(data: Shop): IShopViewModel {
    let model = new ShopViewModel();
    model = Object.assign(model, data);
    model.ObjectStateName = this.language.ShopObjectState(data.ObjectState);
    model.ShopTypeName = this.language.ShopType(data.ShopType);

    if (data.Confidence) {
      model.ConfidenceRatio = `${(data.Confidence * 100).toFixed(2)}%`;
    }
    if (data.TaskIds && data.TaskIds.length > 0) {
      let params = new GetAnalysisTaskListParams();
      params.TaskIds = data.TaskIds;
      model.Tasks = this.analysis.server.task.cache.array(params);
    }

    return model;
  }
  private registration(data: ShopRegistration): IShopViewModel {
    let model = new ShopRegistrationViewModel();
    model = Object.assign(model, data);
    model.ObjectStateName = this.language.ShopObjectState(data.ObjectState);
    model.ShopTypeName = this.language.ShopType(data.ShopType ?? 1);
    return model;
  }
}
