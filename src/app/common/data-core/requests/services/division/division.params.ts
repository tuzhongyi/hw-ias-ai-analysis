import { PagedParams } from '../../../models/params.interface';

export class GetDivisionsParams extends PagedParams {
  /**	Int32[]	区划类型	O	*/
  DivisionTypes?: number[];
  /**	String[]	区划ID列表	O	*/
  DivisionIds?: string[];
  /**	String[]	父节点ID列表	O	*/
  ParentIds?: string[];
  /**	String	区划名称	O	*/
  Name?: string;
}
