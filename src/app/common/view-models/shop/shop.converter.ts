import { Injectable } from '@angular/core';
import { IShop } from '../../data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../data-core/models/arm/geographic/shop-registration.model';
import { ArmAnalysisRequestService } from '../../data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../data-core/requests/services/analysis/server/analysis-server.params';
import { ArmGeographicRequestService } from '../../data-core/requests/services/geographic/geographic.service';
import { LanguageTool } from '../../tools/language-tool/language.tool';
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
    private analysis: ArmAnalysisRequestService,
    private geo: ArmGeographicRequestService
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
    model.ObjectStateName = this.language.analysis.shop.ShopObjectState(
      data.ObjectState
    );
    model.ShopTypeName = this.language.analysis.shop.ShopType(data.ShopType);

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
    model.ObjectStateName = this.language.analysis.shop.ShopObjectState(
      data.ObjectState
    );
    model.ShopTypeName = this.language.analysis.shop.ShopType(
      data.ShopType ?? 1
    );
    return model;
  }
}
