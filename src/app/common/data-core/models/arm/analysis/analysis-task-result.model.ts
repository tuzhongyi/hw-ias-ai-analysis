import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IIdModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { SignResult } from './sign-result.model';

/**	AnalysisTaskResult (分析结果)	*/
export class AnalysisTaskResult implements IIdModel {
  /**	String	ID	M	*/
  Id!: string;
  /**	Int64	整数ID	M	*/
  IntId!: number;
  /**	String	图片地址	O	*/
  ImageUrl?: string;
  /**	DateTime	分析视频帧的时间	M	*/
  @Transform(Transformer.DateTime)
  Time!: Date;
  /**	Int32	任务类型，101-店招检测	M	*/
  TaskType!: number;
  /**	String	任务ID	M	*/
  TaskId!: string;
  /**	Int32	保留	O	*/
  GroupId?: number;
  /**	SignResult	招牌分析结果	O	*/
  @Type(() => SignResult)
  SignResult?: SignResult;
}
