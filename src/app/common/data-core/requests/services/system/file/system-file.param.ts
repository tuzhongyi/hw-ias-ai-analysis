import { IParams } from '../../../../models/params.interface';

export class ParseGpsItemParams implements IParams {
  /**	String	文件名称	M */
  FileName!: string;
  /**	Boolean	是否根据道路矫正坐标，默认false：不矫正	O */
  Rectified?: boolean;
}
