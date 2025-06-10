import { PagedDurationParams } from '../../../../models/params.interface';

export class GetMobileEventsParams extends PagedDurationParams {
  /**	Int32	事件类型	O	*/
  EventType?: number;
  /**	Boolean	是否已派单，true：已派单	O	*/
  Assigned?: boolean;
  /**	Boolean	是否已处置，true：已处置	O	*/
  Handled?: boolean;
  /**	Boolean	是否为误报，true：误报	O	*/
  IsMisInfo?: boolean;

  /**	Int32	用户分组ID	O */
  GroupId?: number;
  /**	String	资源名称	O */
  ResourceName?: string;
  /**	Int32[]	店招关联方式，1：误报，2：消失，3：停业或装修，4：恢复营业，5：新增屏蔽，6：子招牌合并	O */
  AssociationTypes?: number[];
  /**	String	升序属性，不区分大小写	O */
  Asc?: string;
  /**	String	降序属性，不区分大小写	O */
  Desc?: string;
}
