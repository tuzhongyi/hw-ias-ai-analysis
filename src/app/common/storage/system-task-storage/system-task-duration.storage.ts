export class SystemTaskDurationTypeStorage {
  key = 'system-task-duration-type';

  get() {
    let str = localStorage.getItem(this.key);
    if (str) {
      return parseInt(str);
    }
    return undefined;
  }
  set(value: number) {
    localStorage.setItem(this.key, `${value}`);
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
