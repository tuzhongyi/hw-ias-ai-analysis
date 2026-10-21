import { Injectable } from '@angular/core';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Language } from '../../../../../common/tools/language-tool/language';

@Injectable()
export class ManagementDivisionSource {
  types = [
    {
      value: ArmDivisionType.Province,
      name: Language.DivisionType(ArmDivisionType.Province),
    },
    {
      value: ArmDivisionType.City,
      name: Language.DivisionType(ArmDivisionType.City),
    },
    {
      value: ArmDivisionType.County,
      name: Language.DivisionType(ArmDivisionType.County),
    },
    {
      value: ArmDivisionType.GridCell,
      name: Language.DivisionType(ArmDivisionType.GridCell),
    },
  ];
}
