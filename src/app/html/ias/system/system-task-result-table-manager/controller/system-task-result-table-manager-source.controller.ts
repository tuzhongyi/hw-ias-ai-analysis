import { Injectable } from '@angular/core';
import { ResultLabelType } from '../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemTaskResultTableManagerSourceController {
  constructor(private manager: Manager) {
    this.channels = this.init.channels();
    this.labels = this.init.labels();
    this.types = this.init.types();
  }

  channels: Promise<EnumNameValue[]>;
  types: Promise<EnumNameValue<SignType>[]>;
  labels: Promise<EnumNameValue<ResultLabelType>[]>;

  private init = {
    types: () => {
      return new Promise<EnumNameValue<SignType>[]>((resolve) => {
        this.manager.capability.analysis.shop.then((x) => {
          if (x.SignTypes) {
            resolve(x.SignTypes);
          }
        });
      });
    },
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
