import { IModel } from '../../model.interface'

/**	GpsConfig (GPS配置)	*/
export class GpsConfig implements IModel {
  /**	Int32	采样间隔，单位：ms	M	*/
  SimpleFrequency!: number
  /**	Int32	采样筛选频率，N个采样选取1个	M	*/
  SimpleRate!: number
}
