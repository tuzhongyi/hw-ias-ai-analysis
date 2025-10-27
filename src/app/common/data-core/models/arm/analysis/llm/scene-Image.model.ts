import { Type } from 'class-transformer';
import { IModel } from '../../../model.interface';
import { SceneLabel } from './scene-label.model';

/**	SceneImage (场景图片)	*/
export class SceneImage implements IModel {
  /**	String	图片Url	M	*/
  ImageUrl!: string;
  /**
   * String
   * 机位方向:（暂时不需要）
   * Left：左侧
   * Right：右侧
   * Front：前方
   * Back：后方
   * O
   **/
  CameraSide?: string;
  /**	Int32	摄像机机位，1-n，建议填写	O	*/
  PositionNo?: number;
  /**	SceneLabel[]	场景区域或目标标签	O	*/
  @Type(() => SceneLabel)
  Labels?: SceneLabel[];
}
