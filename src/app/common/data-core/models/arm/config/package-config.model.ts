import { IModel } from '../../model.interface'

/**	PackageConfig (文件打包方式)	*/
export class PackageConfig implements IModel {
  /**	Int32	打包时长，[3,30]，单位：分钟	M	*/
  Duration!: number
  /**	String	打包格式，目前只有：MKV	M	*/
  PackageFormat!: string
  /**	Boolean	自动覆盖	M	*/
  AutoOverlay!: boolean
}
