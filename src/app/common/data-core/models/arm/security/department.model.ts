import { Transform } from 'class-transformer';
import { IIdNameModel } from '../../interface/model.interface';
import { Transformer } from '../../transformer';
import { AutomaticAssignmentRule } from './automatic-assignment-rule.model';

/**	Department (部门信息)	*/
export class Department implements IIdNameModel {
  /**	String	部门ID	M	*/
  Id!: string;
  /**	String	部门名称	M	*/
  Name!: string;
  /**	Int32	部门类型，用于简单分组	O	*/
  DepartmentType?: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	AutomaticAssignmentRule	自动分配规则	O	*/
  AssignmentRule?: AutomaticAssignmentRule;
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
  /**	String	分组GUID	M	*/
  GroupGuid!: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	网格ID	O	*/
  GridCellId?: string;
  /**	String[]	子部门ID，（保留，暂时不需要）	O	*/
  SubDepartmentIds?: string[];
}
