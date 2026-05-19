import { IModel } from '../../interface/model.interface';

/**	AutomaticAssignmentRule (事件自动分配规则)	*/
export class AutomaticAssignmentRule implements IModel {
  /**	Boolean	是否启用自动分配	M	*/
  Enabled!: boolean;
  /**	Int32[]	自动分配的事件类型	M	*/
  EventTypes!: number[];
  /**	Int32[]	分派方式（保留）	O	*/
  Methods?: number[];
}
