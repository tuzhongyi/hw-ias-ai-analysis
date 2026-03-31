import { PagedParams } from '../../../../../models/interface/params.interface';

export class GetRoadPointsParams extends PagedParams {
  /**	String[]	路段ID列表	O	*/
  Ids?: string[];
  /**	String	名称，支持LIKE	O	*/
  Name?: string;
  /**	Int32[]	屏蔽点类型	O	*/
  PointTypes?: number[];
  /**	String	分组ID	O	*/
  GroupGuid?: string;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
