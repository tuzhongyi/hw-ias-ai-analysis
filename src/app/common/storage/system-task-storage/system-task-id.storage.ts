import { IIdNameModel } from '../../data-core/models/model.interface';

export class SystemTaskInfoStorage {
  key = 'system-task-info';

  get() {
    let str = localStorage.getItem(this.key);
    if (str) {
      return JSON.parse(str) as IIdNameModel;
    }
    return undefined;
  }
  set(value: IIdNameModel) {
    let str = JSON.stringify(value);
    localStorage.setItem(this.key, str);
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
