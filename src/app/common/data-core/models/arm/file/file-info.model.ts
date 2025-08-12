import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { Transformer } from '../../transformer';

/**	FileInfo (文件信息)	*/
export class FileInfo implements IModel {
  /**	String	文件名称和路径	M	*/
  FileName!: string;
  /**	Int64	文件大小，单位：字节	M	*/
  FileSize!: number;
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	最后修改时间	M	*/
  @Transform(Transformer.DateTime)
  ModifiedTime!: Date;
  /**	Boolean	是否为目录	M	*/
  IsDirectory!: boolean;
}
