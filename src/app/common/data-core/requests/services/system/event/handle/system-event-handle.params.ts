import { IParams } from '../../../../../models/params.interface';

export class CreateShopRegistrationParams implements IParams {
  /**	String	新增的注册商铺信息ID	M	*/
  RegistrationId!: string;
  /**	Boolean	是否为副或子招牌，true表示是子招牌，null或false表示不是。	O	*/
  IsSubSignboard?: boolean;
}
export class MarkingShopParams implements IParams {
  /**	Boolean	屏蔽数据，true：屏蔽	M	*/
  Marking!: boolean;
}
export class MergeShopParams implements IParams {
  /**	String	新增的注册商铺信息ID	M	*/
  RegistrationId!: string;
  /**	Boolean	是否为副或子招牌，true表示是子招牌，null或false表示不是。	O	*/
  IsSubSignboard?: boolean;
  /**	String	确认后的主或子的招牌名称，如果不提供将默认使用Shop的Name	O	*/
  Name?: string;
}
export class ChangeBusinessStateParams implements IParams {
  /**	Int32	营业状态	M	*/
  BusinessState!: number;
}
