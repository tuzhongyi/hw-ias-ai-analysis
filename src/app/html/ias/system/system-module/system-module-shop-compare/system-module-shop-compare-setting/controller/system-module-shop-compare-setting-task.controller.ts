import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';
import {
  ISystemCompareStorage,
  TaskDuration,
} from '../../../../../../../common/storage/system-compare-storage/system-compare.storage';

@Injectable()
export class SystemModuleShopCompareSettingTaskController {
  public get count() {
    return this.storage.task.count;
  }
  public set count(v: number) {
    this.storage.task.count = v;
    this.local.system.compare.set(this.storage);
  }

  public get duration() {
    return this.storage.task.duration;
  }
  public set duration(v: TaskDuration) {
    this.storage.task.duration = v;
    this.local.system.compare.set(this.storage);
  }

  constructor(private local: LocalStorage) {
    this.storage = local.system.compare.get();
  }
  private storage: ISystemCompareStorage;
}
