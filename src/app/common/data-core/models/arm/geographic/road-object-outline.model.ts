import { IIdNameModel } from '../../interface/model.interface';

/**	RoadObjectOutline (道路部件概要信息)	*/
export class RoadObjectOutline implements IIdNameModel {
  /**	String	部件ID	M	*/
  Id!: string;
  /**	String	部件名称	M	*/
  Name!: string;
  /**	Int32	部件类型	M	*/
  ObjectType!: number;
  /**	Int32	部件状态	M	*/
  ObjectState!: number;
  /**	Boolean	禁用	O	*/
  Disable?: boolean;
  /**	Int32	正常次数	O	*/
  NormalTimes?: number;
  /**	Int32	异常次数	O	*/
  BreakageTimes?: number;
  /**	Int32	消失次数	O	*/
  DisappearTimes?: number;
}
