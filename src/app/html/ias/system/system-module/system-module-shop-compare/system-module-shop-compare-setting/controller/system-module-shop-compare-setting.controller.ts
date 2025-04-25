import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';
import { ISystemCompareStorage } from '../../../../../../../common/storage/system-compare-storage/system-compare.storage';
import { SystemModuleShopCompareSettingTaskController } from './system-module-shop-compare-setting-task.controller';

@Injectable()
export class SystemModuleShopCompareSettingController {
  get ratio(): number {
    return this.storage.ratio * 100;
  }
  set ratio(v: number) {
    this.storage.ratio = v / 100;
    this.local.system.compare.set(this.storage);
  }
  get distance(): number {
    return this.storage.distance;
  }
  set distance(v: number) {
    this.storage.distance = v;
    this.local.system.compare.set(this.storage);
  }

  constructor(
    private local: LocalStorage,
    public task: SystemModuleShopCompareSettingTaskController
  ) {
    this.storage = local.system.compare.get();
  }

  private storage: ISystemCompareStorage;
}
