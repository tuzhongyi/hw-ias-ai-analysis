import { Injectable } from '@angular/core';
import { ResultLabelType } from '../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { EnumTool } from '../../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../../common/tools/language';

@Injectable()
export class SystemTaskResultInfoSourceController {
  constructor() {
    this.labels = EnumTool.values(ResultLabelType)
      .filter((x) => x != ResultLabelType.Unlabeled)
      .map((x) => {
        let item = new EnumNameValue<ResultLabelType>();
        item.Name = Language.ResultLabelType(x);
        item.Value = x;
        return item;
      });
  }

  channels = [1, 2, 3, 4];
  labels: EnumNameValue<ResultLabelType>[];
}
