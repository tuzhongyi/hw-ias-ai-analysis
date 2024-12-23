import { Transform } from 'class-transformer'
import { IModel } from '../model.interface'
import { transformDate } from '../transformer'

/**	DeviceInfo (设备信息)	*/
export class DeviceInfo implements IModel {
  /**	String	设备名称：垃圾分类主机	M	*/
  Name!: string
  /**	String	型号：GCHA01	M	*/
  Model!: string
  /**	String	序列号：HW-GCHA01-00001	M	*/
  SerialNumber!: string
  /**	String	设备类型：GCHA	M	*/
  DeviceType!: string
  /**	String	软件版本号 1.0.1	M	*/
  FirmwareVersion!: string
  /**	DateTime	编译时间	M	*/
  @Transform(transformDate)
  FirmwareBuildDate!: Date
  /**	String	公司名	M	*/
  Company!: string
  /**	String	操作系统	M	*/
  OS!: string
  /**	String	硬件类型、芯片型号	M	*/
  Hardware!: string
  /**	String	硬件版本号	M	*/
  HardwareVersion!: string
  /**	String	供应商信息	M	*/
  Vendor!: string
  /**	String	自定义信息	O	*/
  CustomizedInfo?: string
  /**	Boolean	是否支持无线网络	M	*/
  Wireless!: boolean
  /**	Int32	硬盘个数	M	*/
  HddNumber!: number
  /**	Int32	报警输入个数	M	*/
  IOInNumber!: number
  /**	Int32	报警输出个数	M	*/
  IOOutNumber!: number
  /**	Int32	最大IPC接入通道数量	M	*/
  MaxIPCNumber!: number
}
