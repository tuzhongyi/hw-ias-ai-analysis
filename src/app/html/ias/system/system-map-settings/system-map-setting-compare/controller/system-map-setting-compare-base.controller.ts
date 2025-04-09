import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../../common/storage/local.storage';
import { ISystemMapStorage } from '../../../../../../common/storage/system-map-storage/system-map.storage';

@Injectable()
export class SystemMapSettingCompareBaseController {
  public get count(): number {
    return this.config.mintaskcount || this.max;
  }
  public set count(v: number) {
    this.changed.count = true;
    this.config.mintaskcount = v;
    this.local.system.map.set(this.config);
  }

  max: number = 10;

  private changed = {
    count: false,
  };
  private original = {
    count: 0,
  };

  constructor(private local: LocalStorage) {
    this.config = local.system.map.get();
    this.init();
  }

  private config: ISystemMapStorage;

  private init() {
    if (!this.config.mintaskcount) {
      this.count = this.max;
    }
    this.original.count = this.count;
  }

  reset() {
    if (this.changed.count) {
      this.count = this.original.count;
    }
  }
}
