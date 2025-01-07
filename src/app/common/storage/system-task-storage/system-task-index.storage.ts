export class SystemTaskIndexStorage {
  key = 'system-task-index';

  get() {
    let str = localStorage.getItem(this.key);
    if (str) {
      return JSON.parse(str) as boolean;
    }
    return undefined;
  }
  set(value?: boolean) {
    if (value === undefined) {
      localStorage.setItem(this.key, '');
    } else {
      localStorage.setItem(this.key, JSON.stringify(value));
    }
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
