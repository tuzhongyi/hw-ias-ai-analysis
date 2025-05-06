import { Injectable } from '@angular/core';
import { ResultLabelType } from '../../../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemTaskResultInfoSourceController {
  channels: Promise<EnumNameValue[]>;
  labels: Promise<EnumNameValue<ResultLabelType>[]>;

  constructor(source: SourceManager) {
    this.labels = source.shop.ResultLabelTypes.get().then((x) => {
      return x.filter((y) => y.Value != ResultLabelType.Unlabeled);
    });
    this.channels = source.shop.CameraNos.get();
  }
}
