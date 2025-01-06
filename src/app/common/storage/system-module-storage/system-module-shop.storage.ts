export interface ISystemModuleShopStorage {
  mode: number;
}
export class SystemModuleShopStorage {
  key = 'system-module-shop';

  get() {
    let str = localStorage.getItem(this.key);
    let model = JSON.parse(str || '{}') as ISystemModuleShopStorage;
    return model;
  }
  set(value: ISystemModuleShopStorage) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
