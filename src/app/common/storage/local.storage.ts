import { Injectable } from '@angular/core';
import { AuthorizationStore } from './authorization/authorization.store';
import { LoginInfoStore } from './login-info-storage/login-info.store';
import { SystemModuleShopStorage } from './system-module-storage/system-module-shop.storage';
import { SystemTaskIdStorage } from './system-task-storage/system-task-id.storage';
import { SystemTaskIndexStorage } from './system-task-storage/system-task-index.storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  auth = new AuthorizationStore();
  login = new LoginInfoStore();

  system = {
    task: {
      index: new SystemTaskIndexStorage(),
      id: new SystemTaskIdStorage(),
    },
    module: {
      shop: new SystemModuleShopStorage(),
    },
  };

  clear() {
    this.auth.clear();
    this.login.clear();
    this.system.task.index.clear();
    this.system.task.id.clear();
    this.system.module.shop.clear();
  }
}
