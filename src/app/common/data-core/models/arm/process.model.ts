import { ProcessState } from '../../enums/process-state.enum';
import { IIdNameModel } from '../model.interface';

/**	Process (进程信息)	*/
export class Process implements IIdNameModel {
  /**	String	进程ID	M	*/
  Id!: string;
  /**	String	进程名称	M	*/
  Name!: string;
  /**	Double	内存占用，（单位：MB）	M	*/
  MemoryUsage!: number;
  /**	Double	CPU占用百分比[0-100]	M	*/

  CPUUsage!: number;
  /**	Double	网络速率，（单位：Mbps）	O	*/
  NetworkSpeed?: number;
  /**
   * String	进程状态，
   * R：运行中
   * D：不可中断睡眠
   * S：可中断睡眠
   * T：已停止
   * Z：僵尸
   * O
   **/
  State?: ProcessState;
}
