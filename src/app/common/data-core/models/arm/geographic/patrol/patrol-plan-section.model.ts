import { IModel } from '../../../interface/model.interface';

/**	PatrolPlanSection (巡逻计划路段简略信息)	*/
export class PatrolPlanSection implements IModel {
  /**	String	路段ID	M	*/
  SectionId!: string;
  /**	String	路段名称	O	*/
  SectionName?: string;
  /**	Int32	顺序编号，从1开始	O	*/
  Order?: number;
}
