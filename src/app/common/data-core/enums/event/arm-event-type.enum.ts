/**	EventType (事件类型)	*/
export enum ArmEventType {
  /**	占道经营、乱设摊位	*/
  SetupStall = 1,
  /**	井盖丢失	*/
  ManholeCover = 2,
  /**	非法施工	*/
  IllegalConstruction = 3,
  /**	道路垃圾	*/
  GarbageOnRoad = 4,
  /**	共享单车堆放	*/
  StackingBike = 5,
}
