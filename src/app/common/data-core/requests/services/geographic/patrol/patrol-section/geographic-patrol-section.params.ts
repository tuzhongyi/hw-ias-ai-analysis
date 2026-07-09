import { PagedParams } from '../../../../../models/interface/params.interface';

/**	GetPatrolSectionsParams (获取巡逻路段列表参数)	*/
export class GetPatrolSectionsParams extends PagedParams {
  /**	String[]	ID列表	O	*/
  Ids?: string[];
  /**	String	名称，支持LIKE	O	*/
  Name?: string;
  /**	Int32[]	路段方向	O	*/
  RoadDirections?: number[];
  /**	String[]	区划ID	O	*/
  DivisionIds?: string[];
}
