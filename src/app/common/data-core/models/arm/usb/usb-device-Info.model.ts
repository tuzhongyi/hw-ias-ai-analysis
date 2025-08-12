import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { Transformer } from '../../transformer';

/**	UsbDeviceInfo (Usb挂载的设备信息)	*/
export class UsbDeviceInfo implements IModel {
  /**	String	名称	M	*/
  Name!: string;
  /**	String	标签名称	O	*/
  Label?: string;
  /**	String	设备路径	M	*/
  DevPath!: string;
  /**	String	挂载上的路径	O	*/
  MountPath?: string;
  /**	Int64	总容量，单位：字节	O	*/
  @Transform(Transformer.Size)
  TotalSize?: string;
  /**	Int64	可用容量，单位：字节	O	*/
  @Transform(Transformer.Size)
  AvailableSize?: string;
  /**	String	文件系统	O	*/
  FileSystemType?: string;
  /**	Boolean	是否已挂载	M	*/
  Mounted!: boolean;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
}
