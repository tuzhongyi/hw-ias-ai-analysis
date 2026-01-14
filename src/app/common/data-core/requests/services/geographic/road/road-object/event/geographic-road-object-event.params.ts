import { EventResource } from '../../../../../../models/arm/event/event-resource.model';
import {
  IParams,
  PagedDurationParams,
} from '../../../../../../models/params.interface';

export class GetRoadObjectEventsParams extends PagedDurationParams {
  /**	String[]	时间ID	O	*/
  Ids?: string[];
  /**	Int32	事件类型	O	*/
  EventType?: number;
  /**	Boolean	是否已派单，true：已派单	O	*/
  Assigned?: boolean;
  /**	Boolean	是否已处置，true：已处置	O	*/
  Handled?: boolean;
  /**	Boolean	是否为误报，true：误报	O	*/
  IsMisInfo?: boolean;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String[]	区划列表	O	*/
  DivisionIds?: string[];
  /**	String[]	网格列表	O	*/
  GridCellIds?: string[];
  /**	Boolean	是否已确认	O	*/
  Confirmed?: boolean;
  /**	String[]	道路固件ID	O	*/
  RoadObjectIds?: string[];
  /**	Int32	道路固件类型	O	*/
  RoadObjectType?: number;
  /**	String	名称，LIKE	O	*/
  RoadObjectName?: string;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}

export class RoadObjectEventConfirmation implements IParams {
  /**	String	事件ID	M	*/
  Id!: string;
  /**	Int32	分类的事件类型	M	*/
  EventType!: number;
  /**	Double	置信度0-100	O	*/
  Confidence?: number;
  /**	String	LLM场景描述	O	*/
  Description?: string;
  /**	Double	物件健康度，0-100	O	*/
  Health?: number;
  /**	EventResource[]	资源列表	O	*/
  Resources?: EventResource[];
}
