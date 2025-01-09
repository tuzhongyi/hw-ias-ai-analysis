export class ISystemModuleShopStorage {
  mode: number = 0;
  page = {
    table: 1,
    list: 1,
  };
}
export class SystemModuleShopStorage {
  key = 'system-module-shop';

  get() {
    let str = localStorage.getItem(this.key);
    let model: ISystemModuleShopStorage;
    if (str) {
      model = JSON.parse(str) as ISystemModuleShopStorage;
    } else {
      model = new ISystemModuleShopStorage();
    }
    return model;
  }
  set(value = new ISystemModuleShopStorage()) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
