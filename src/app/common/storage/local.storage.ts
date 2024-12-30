import { Injectable } from '@angular/core';
import { AuthorizationStore } from './authorization/authorization.store';
import { SystemTaskIndexStorage } from './system-task.storage.ts/system-task-index.storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  auth = new AuthorizationStore();

  system = {
    task: {
      index: new SystemTaskIndexStorage(),
    },
  };

  clear() {
    this.auth.clear();
    this.system.task.index.clear();
  }
}
