export class UnloadStore {
  constructor() {}

  key = 'unload';
  get() {
    let str = localStorage.getItem(this.key);
    if (str) {
      return new Date(parseInt(str));
    }
    return undefined;
  }
  set(value: Date) {
    localStorage.setItem(this.key, value.getTime().toString());
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
