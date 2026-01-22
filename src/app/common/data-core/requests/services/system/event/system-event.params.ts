import { GisPoint } from '../../../../models/arm/gis-point.model';
import {
  IParams,
  PagedDurationParams,
} from '../../../../models/params.interface';

export class GetMobileEventsParams extends PagedDurationParams {
  /**	Int32	事件类型	O	*/
  EventType?: number;
  /**	Boolean	是否已派单，true：已派单	O	*/
  Assigned?: boolean;
  /**	Boolean	是否已处置，true：已处置	O	*/
  Handled?: boolean;
  /**	Boolean	是否为误报，true：误报	O	*/
  IsMisInfo?: boolean;

  /**	Int32[]	事件类型	O */
  EventTypes?: number[];
  /**	Int32	突发情况分类	O */
  EmergencyType?: number;
  /**	Int32	用户分组ID	O */
  GroupId?: number;
  /**	String	资源名称	O */
  ResourceName?: string;
  /**	Int32[]	店招关联方式，1：误报，2：消失，3：停业或装修，4：恢复营业，5：新增屏蔽，6：子招牌合并	O */
  AssociationTypes?: number[];
  /**	String	任务ID	O */
  TaskId?: string;
  /**	String[]	区划列表	O */
  DivisionIds?: string[];
  /**	String[]	网格列表	O */
  GridCellIds?: string[];
  /**	Boolean	是否已确认	O */
  Confirmed?: boolean;
  /**	Boolean	是否为实时事件	O */
  IsLiveEvent?: boolean;
  /**	GisPoint	照片Gis坐标	D */
  Location?: GisPoint;
  /**	Double	单位：米，必须与Location一起出现	D */
  LocationDistance?: number;
  /**	Boolean	多次重复标记	O */
  IsTimeout?: boolean;
  /**	String	升序属性，不区分大小写	O */
  Asc?: string;
  /**	String	降序属性，不区分大小写	O */
  Desc?: string;
}
export class GetMobileEventFileParams implements IParams {
  Channel?: number;
  Duration?: number;

  to = {
    query: () => {
      let params: string[] = [];
      if (this.Channel !== undefined) {
        params.push(`Channel=${this.Channel}`);
      }
      if (this.Duration !== undefined) {
        params.push(`Duration=${this.Duration}`);
      }
      return params.join('&');
    },
  };
}
export class GetMobileEventFileGpsItemsParams implements IParams {
  Rectified?: boolean;
  Channel?: number;
  Duration?: number;

  to = {
    query: () => {
      let params: string[] = [];
      if (this.Rectified !== undefined) {
        params.push(`Rectified=${this.Rectified}`);
      }
      if (this.Channel !== undefined) {
        params.push(`Channel=${this.Channel}`);
      }
      if (this.Duration !== undefined) {
        params.push(`Duration=${this.Duration}`);
      }
      return params.join('&');
    },
  };
}
