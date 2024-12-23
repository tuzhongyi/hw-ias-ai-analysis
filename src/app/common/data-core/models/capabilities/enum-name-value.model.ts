import { IModel } from '../model.interface';

/**	EnumNameValue (枚举类型)	*/
export class EnumNameValue<T = string> implements IModel {
  constructor(value?: T, name?: string) {
    if (value !== undefined) {
      this.Value = value;
    }
    if (name) {
      this.Name = name;
    }
  }
  /**	String	枚举数值	M	*/
  Value!: T;
  /**	String	枚举名称	M	*/
  Name!: string;

  equals(value: EnumNameValue<T>) {
    return this.Value === value.Value;
  }
}
