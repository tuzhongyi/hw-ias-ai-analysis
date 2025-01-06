export class SystemTaskIndexStorage {
  key = 'system-task-index';

  get() {
    let str = localStorage.getItem(this.key);
    return parseInt(str || '0');
  }
  set(value: number) {
    localStorage.setItem(this.key, value.toString());
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
