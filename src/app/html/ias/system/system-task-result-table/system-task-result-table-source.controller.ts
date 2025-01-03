import { Injectable } from '@angular/core';
import { SignType } from '../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool';

@Injectable()
export class SystemTaskResultTableSourceController {
  constructor() {
    this.types = EnumTool.values(SignType);
  }

  channels = [1, 2, 3, 4];
  types: number[];
}
