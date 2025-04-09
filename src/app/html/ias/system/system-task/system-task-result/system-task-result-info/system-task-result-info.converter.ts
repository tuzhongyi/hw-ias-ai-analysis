import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { TaskResultItemModel } from './system-task-result-info.model';

@Injectable()
export class SystemTaskResultInfoConverter {
  constructor(private medium: MediumRequestService) {}

  convert(source: ShopSign) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(TaskResultItemModel, plain);
    if (source.ImageUrl) {
      model.Image = this.medium.picture(source.ImageUrl);
    }
    return model;
  }
}
