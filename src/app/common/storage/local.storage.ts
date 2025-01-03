import { Injectable } from '@angular/core';
import { AuthorizationStore } from './authorization/authorization.store';
import { LoginInfoStore } from './login-info-storage/login-info.store';
import { SystemTaskIdStorage } from './system-task.storage.ts/system-task-id.storage';
import { SystemTaskIndexStorage } from './system-task.storage.ts/system-task-index.storage';

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
  };

  clear() {
    this.auth.clear();
    this.login.clear();
    this.system.task.index.clear();
    this.system.task.id.clear();
  }
}
