import { Injectable } from '@angular/core';
import { AuthorizationStore } from './authorization/authorization.store';
import { LoginInfoStore } from './login-info-storage/login-info.store';
import { SystemCompareStorage } from './system-compare-storage/system-compare.storage';
import { SystemMapStorage } from './system-map-storage/system-map.storage';
import { SystemModuleShopStorage } from './system-module-storage/system-module-shop.storage';
import { SystemTaskDurationTypeStorage } from './system-task-storage/system-task-duration.storage';
import { SystemTaskInfoStorage } from './system-task-storage/system-task-id.storage';
import { SystemTaskIndexStorage } from './system-task-storage/system-task-index.storage';
import { UnloadStore } from './unload/unload.store';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  auth = new AuthorizationStore();
  login = new LoginInfoStore();
  unload = new UnloadStore();

  system = {
    task: {
      index: new SystemTaskIndexStorage(),
      info: new SystemTaskInfoStorage(),
      duration: new SystemTaskDurationTypeStorage(),
    },
    module: {
      shop: new SystemModuleShopStorage(),
    },
    map: new SystemMapStorage(),
    compare: new SystemCompareStorage(),
  };

  clear() {
    this.auth.clear();
    this.system.task.index.clear();
    this.system.task.info.clear();
    this.system.task.duration.clear();
    this.system.module.shop.clear();
    this.system.compare.clear();
  }
}
