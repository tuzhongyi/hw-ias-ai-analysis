import { PagedParams } from '../../../../models/params.interface';

export class GetMobileDevicesParams extends PagedParams {
  /**	String[]	设备ID列表	O	*/
  Ids?: string[];
  /**	String	设备名称	O	*/
  Name?: string;
  /**	String	设备序列号	O	*/
  SerialNumber?: string;
  /**	Int32	设备类型，1：巡逻车辆	O	*/
  DeviceType?: number;
  /**	Int32	在线状态，0：在线，1：离线	O	*/
  OnlineStatus?: number;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
