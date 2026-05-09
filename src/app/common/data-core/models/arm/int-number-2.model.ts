import { IModel } from '../interface/model.interface';

/**	Int2Number (分类和状态数量)	*/
export class Int2Number implements IModel {
  /**	Int32	分类类型	M	*/
  Value1!: number;
  /**	Int32	状态类型	M	*/
  Value2!: number;
  /**	Int64	数量	M	*/
  Number!: number;
}
