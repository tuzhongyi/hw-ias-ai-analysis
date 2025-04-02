export class ISystemMapStorage {
  mintaskcount = 0;
}
export class SystemMapStorage {
  key = 'system-map';

  get() {
    let str = localStorage.getItem(this.key);
    let model: ISystemMapStorage;
    if (str) {
      model = JSON.parse(str) as ISystemMapStorage;
    } else {
      model = new ISystemMapStorage();
    }
    return model;
  }
  set(value = new ISystemMapStorage()) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
