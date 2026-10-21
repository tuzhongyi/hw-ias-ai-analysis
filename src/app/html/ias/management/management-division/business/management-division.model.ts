import { Division } from '../../../../../common/data-core/models/arm/division/division.model';

export interface ManagementDivisionTableArgs {
  type?: number;
  name?: string;
  parent?: Division;
}

export class ManagementDivisionTableItem extends Division {
  /** 父节点，根节点为空 */
  Parent?: Promise<Division | undefined>;
}
