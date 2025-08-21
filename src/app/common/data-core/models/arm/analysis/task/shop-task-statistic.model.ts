import { IModel } from '../../../model.interface';

/**	ShopTaskStatistic (商铺任务统计结果)	*/
export class ShopTaskStatistic implements IModel {
  /**	Int64	识别的商铺总数量	M	*/
  ShopCount: number = 0;
  /**	Int64	设别到的商铺关联的注册商铺数量	M	*/
  ShopRegistrationCount: number = 0;
  /**	Int64	未识别到的注册商铺数量	M	*/
  UndetectedShopRegistrationCount: number = 0;
  /**	Int64	新发现的商铺数量	M	*/
  NewShopCount: number = 0;
  /**	Int64	错误识别或被屏蔽的商铺数量	M	*/
  MisdetectedShopCount: number = 0;
}
