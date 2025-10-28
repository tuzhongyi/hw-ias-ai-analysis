import { Type } from 'class-transformer';
import { EnumNameValue } from '../../../capabilities/enum-name-value.model';
import { IModel } from '../../../model.interface';
/**	AnalysisLLMCapability (大语言模型能力)	*/
export class AnalysisLLMCapability implements IModel {
  /**	EnumNameValue[]	摄像机方向	O	*/
  @Type(() => EnumNameValue)
  CameraSides?: EnumNameValue[];
  /**	EnumNameValue[]	场景标签类型	O	*/
  @Type(() => EnumNameValue)
  SceneLabelTypes?: EnumNameValue[];
  /**	EnumNameValue[]	场景类型	O	*/
  @Type(() => EnumNameValue)
  SceneTypes?: EnumNameValue<number>[];
}
