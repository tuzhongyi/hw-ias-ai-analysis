import { Type } from 'class-transformer';
import { ResultLabelType } from '../../../enums/analysis/result-label-type.enum';
import { ShopObjectState } from '../../../enums/analysis/shop-object-state.enum';
import { SignType } from '../../../enums/analysis/sign-type.enum';
import { EnumNameValue } from '../../capabilities/enum-name-value.model';
import { IModel } from '../../model.interface';

/**	AnalysisShopCapability (商铺店招能力)	*/
export class AnalysisShopCapability implements IModel {
  /**	EnumNameValue[]	商铺类型	O	*/
  @Type(() => EnumNameValue)
  ShopTypes?: EnumNameValue<number>[];
  /**	EnumNameValue[]	店招类型	O	*/
  @Type(() => EnumNameValue)
  SignTypes?: EnumNameValue<SignType>[];
  /**	EnumNameValue[]	标注类型	O	*/
  @Type(() => EnumNameValue)
  ResultLabelTypes?: EnumNameValue<ResultLabelType>[];
  /**	EnumNameValue[]	经营范围	O	*/
  @Type(() => EnumNameValue)
  BusinessScopes?: EnumNameValue<string>[];
  /**	EnumNameValue[]	所属行业	O	*/
  @Type(() => EnumNameValue)
  Industries?: EnumNameValue[];
  /**	EnumNameValue[]	商铺对象状态	O	*/
  @Type(() => EnumNameValue<ShopObjectState>)
  ShopObjectStates?: EnumNameValue<ShopObjectState>[];
  /**	EnumNameValue[]	摄像机机位	O	*/
  @Type(() => EnumNameValue)
  CameraNos?: EnumNameValue<string>[];
  /**	EnumNameValue[]	单位类型	O	*/
  @Type(() => EnumNameValue)
  UnitTypes?: EnumNameValue<string>[];
  /**	EnumNameValue[]	商铺朝向	O	R */
  @Type(() => EnumNameValue)
  ShopSides?: EnumNameValue<number>[];
  /**	EnumNameValue[]	摄像机朝向	O	R */
  @Type(() => EnumNameValue)
  CameraSides?: EnumNameValue<number>[];
  /**	EnumNameValue[]	营业状态	O	R */
  @Type(() => EnumNameValue)
  BusinessStates?: EnumNameValue<number>[];
}
