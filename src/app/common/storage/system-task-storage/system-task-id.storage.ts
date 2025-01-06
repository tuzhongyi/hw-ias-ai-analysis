export class SystemTaskIdStorage {
  key = 'system-task-id';

  get() {
    let str = localStorage.getItem(this.key);
    return str || '';
  }
  set(value: string) {
    localStorage.setItem(this.key, value);
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
