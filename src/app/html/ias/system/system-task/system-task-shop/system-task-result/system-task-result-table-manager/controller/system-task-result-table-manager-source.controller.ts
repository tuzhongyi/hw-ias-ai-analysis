import { Injectable } from '@angular/core';
import { ResultLabelType } from '../../../../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { SignType } from '../../../../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../../../../../common/data-core/requests/managers/source/source.manager';

@Injectable()
export class SystemTaskResultTableManagerSourceController {
  channels: Promise<EnumNameValue[]>;
  types: Promise<EnumNameValue<SignType>[]>;
  labels: Promise<EnumNameValue<ResultLabelType>[]>;

  constructor(source: SourceManager) {
    this.channels = source.analysis.shop.CameraNos.get();
    this.labels = source.analysis.shop.ResultLabelTypes.get();
    this.types = source.analysis.shop.SignTypes.get();
  }
}
