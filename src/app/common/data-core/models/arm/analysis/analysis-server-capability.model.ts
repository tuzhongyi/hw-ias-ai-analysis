import { Type } from 'class-transformer';
import 'reflect-metadata';
import { EnumNameValue } from '../../capabilities/enum-name-value.model';
import { IModel } from '../../model.interface';
/**	AnalysisServerCapability (分析服务器能力)	*/
export class AnalysisServerCapability implements IModel {
  /**	EnumNameValue[]	任务类型	O	*/
  @Type(() => EnumNameValue)
  TaskTypes?: EnumNameValue<number>[];
  /**	EnumNameValue[]	任务状态	O	*/
  @Type(() => EnumNameValue)
  TaskStates?: EnumNameValue<number>[];
  /**	EnumNameValue[]	来源协议类型	O	*/
  @Type(() => EnumNameValue)
  VideoSourceProtocolTypes?: EnumNameValue[];
  /**	EnumNameValue[]	来源模型	O	*/
  @Type(() => EnumNameValue)
  VideoSourceModes?: EnumNameValue[];
  /**	EnumNameValue[]	数据来源类型	O	R */
  @Type(() => EnumNameValue)
  SourceTypes?: EnumNameValue<number>[];
}
