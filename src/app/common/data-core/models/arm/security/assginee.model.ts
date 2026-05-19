import { IIdNameModel } from '../../interface/model.interface';

/**	Assginee (被派单的成员)	*/
export class Assginee implements IIdNameModel {
  /**	String	成员唯一ID	M	*/
  Id!: string;
  /**	String	姓名	M	*/
  Name!: string;
  /**	String	描述信息	O	*/
  Description?: string;
}
