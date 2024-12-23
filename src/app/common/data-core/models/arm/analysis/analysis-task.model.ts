import { Transform } from 'class-transformer'
import { IModel } from '../../model.interface'
import { transformDateTime } from '../../transformer'

/**	AnalysisTask (AI分析任务)	*/
export class AnalysisTask implements IModel {
  /**	String	任务ID	O	*/
  Id?: string
  /**	String	任务名称	O	*/
  Name?: string
  /**	Int32	任务类型：101-店招分析	M	*/
  TaskType!: number
  /**	String[]	文件名称列表	M	*/
  Files!: string[]
  /**	Int32	分组ID，默认用户分组ID，创建时无需填写	O	*/
  GroupId?: number
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date
  /**	Int32	任务状态, 取值: 0-未开始, 1-进行中, 2-完成, 3-失败	O	*/
  State?: number
  /**	Int32	进度，0-100	O	*/
  Progress?: number
  /**	DateTime	任务开始时间，开始后才有	O	*/
  @Transform(transformDateTime)
  StartTime?: Date
  /**	DateTime	任务结束时间，结束后才有	O	*/
  @Transform(transformDateTime)
  StopTime?: Date
  /**	Boolean	任务是否存在，一般情况下任务超过一定天数后将被删除。	O	*/
  Existed?: boolean
}
