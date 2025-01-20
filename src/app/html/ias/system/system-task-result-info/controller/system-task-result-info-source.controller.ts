import { Injectable } from '@angular/core';
import { ResultLabelType } from '../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemTaskResultInfoSourceController {
  constructor(private manager: Manager) {
    this.labels = this.init.labels();
    this.channels = this.init.channels();
  }

  channels: Promise<EnumNameValue[]>;
  labels: Promise<EnumNameValue<ResultLabelType>[]>;

  private init = {
    labels: () => {
      return new Promise<EnumNameValue<ResultLabelType>[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.ResultLabelTypes) {
            let labels = x.ResultLabelTypes.filter(
              (x) => x.Value != ResultLabelType.Unlabeled
            );
            resolve(labels);
          }
        });
      });
    },
    channels: () => {
      return new Promise<EnumNameValue[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.CameraNos) {
            resolve(x.CameraNos);
          }
        });
      });
    },
  };
}
