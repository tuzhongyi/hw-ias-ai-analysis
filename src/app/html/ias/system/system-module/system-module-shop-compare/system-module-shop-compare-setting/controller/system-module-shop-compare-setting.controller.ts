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

  original = {
    ratio: 0,
    distance: 0,
  };

  constructor(
    private local: LocalStorage,
    public task: SystemModuleShopCompareSettingTaskController
  ) {
    this.storage = local.system.compare.get();
    this.original.ratio = this.storage.ratio * 100;
    this.original.distance = this.storage.distance;
  }

  private storage: ISystemCompareStorage;

  reset() {
    this.ratio = this.original.ratio;
    this.distance = this.original.distance;
    this.task.reset();
  }
}
