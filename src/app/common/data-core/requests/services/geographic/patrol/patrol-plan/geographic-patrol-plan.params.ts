import {
  DurationParams,
  PagedParams,
} from '../../../../../models/interface/params.interface';

/**	GetPatrolPlansParams (获取巡逻计划列表参数)	*/
export class GetPatrolPlansParams extends PagedParams {
  /**	String[]	ID列表	O	*/
  Ids?: string[];
  /**	String	名称，支持LIKE	O	*/
  Name?: string;
  /**	Int32	巡逻计划类型	O	*/
  PlanType?: number;
  /**	String	配对设备ID	O	*/
  MobileDeviceId?: string;
  /**	String[]	路段ID列表	O	*/
  PatrolSectionIds?: string[];
  /**	String[]	区划ID	O	*/
  DivisionIds?: string[];
}

/**	MatchPatrolPlansParams (匹配巡检线路状况参数)	*/
export class MatchPatrolPlansParams extends DurationParams {
  /**	String	匹配巡逻计划ID	M	*/
  PatrolPlanId!: string;
  /**	String	巡逻设备ID	M	*/
  MobileDeviceId!: string;
}
