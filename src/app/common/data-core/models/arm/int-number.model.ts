import { IModel } from '../interface/model.interface';

/**	IntNumber (分类数量)	*/
export class IntNumber implements IModel {
  /**	Int32	分类类型或状态类型	M	*/
  Value!: number;
  /**	Int64	数量	M	*/
  Number!: number;
}
