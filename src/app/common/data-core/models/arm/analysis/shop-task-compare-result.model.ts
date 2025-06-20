/**	ShopTaskCompareResult (商铺任务比对结果)	*/

import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../../model.interface';
import { ShopRegistration } from '../geographic/shop-registration.model';
import { Shop } from './shop.model';

export class ShopTaskCompareResult implements IModel {
  /**	ShopRegistration	商铺注册信息	O	*/
  @Type(() => ShopRegistration)
  ShopRegistration?: ShopRegistration;
  /**	Shop	商铺识别信息	O	*/
  @Type(() => Shop)
  Shop?: Shop;
  /**	Int32	比对结果	M	*/
  ObjectState!: number;
}
