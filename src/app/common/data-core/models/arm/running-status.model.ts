import { IModel } from '../model.interface';
import { Process } from './process.model';

/**	RunningStatus (系统运行状态)	*/
export class RunningStatus implements IModel {
  /**	Double	内存占用，（单位：MB）	M	*/

  MemoryUsage!: number;
  /**	Double	总内存大小，（单位：MB）	M	*/

  TotalMemory!: number;
  /**	Double	CPU占用百分比[0-100]	M	*/

  CPUUsage!: number;
  /**	Int64	系统运行时长	M	*/
  SystemUpTime!: number;
  /**	String	芯片类型	O	*/
  ChipType?: string;
  /**	Double	网络速率，（单位：Mbps）	O	*/

  NetworkSpeed?: number;
  /**	Double	CPU芯片温度，单位：摄氏度	O	R */

  ChipTemperature?: number;
  /**	Process[]	进程状态，只监视主要的业务进程	O	*/
  Processes?: Process[];
}
