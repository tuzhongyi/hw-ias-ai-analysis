import { Injectable } from '@angular/core';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { EnumTool } from '../../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../../common/tools/language';

@Injectable()
export class SystemModuleShopCreationSourceController {
  constructor() {
    this.types = EnumTool.values(SignType).map((x) => {
      let item = new EnumNameValue<SignType>();
      item.Name = Language.SignType(x);
      item.Value = x;
      return item;
    });
  }

  types: EnumNameValue<SignType>[];
}
