/**	EventType (事件类型)	*/
export enum EventType {
  /**	垃圾落地事件	*/
  IllegalDrop = 1,
  /**	混合投放事件	*/
  MixedInto = 2,
  /**	垃圾容量事件	*/
  GarbageVolume = 3,
  /**	垃圾满溢事件	*/
  GarbageFull = 4,
  /**	小包垃圾滞留	*/
  GarbageDrop = 5,
  /**	小包垃圾滞留超时	*/
  GarbageDropTimeout = 6,
  /**	小包垃圾滞留处置完成	*/
  GarbageDropHandle = 7,
  /**	小包垃圾滞留超级超时	*/
  GarbageDropSuperTimeout = 8,
  /**	垃圾投放预警	*/
  DropWarning = 9,
  /**	车辆占道，扩展功能事件	*/
  VehiclePresence = 11,
  /**	紧急按钮	*/
  PanicButton = 12,
  /**	火灾检测	*/
  Smoke = 13,
  /**	大件垃圾数据更新	*/
  ConstructionData = 14,
  /**	垃圾厢房设备状态	*/
  DeviceStatus = 15,
  /**	水渍报警	*/
  Sewage = 16,
}
