import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';
import { ISystemCompareStorage } from '../../../../../../../common/storage/system-compare-storage/system-compare.storage';

@Injectable()
export class SystemMapSettingCompareRegistrationController {
  public get ratio(): number {
    return this.storage.ratio * 100 || 50;
  }
  public set ratio(v: number) {
    this.changed.ratio = true;
    this.storage.ratio = v / 100;
    this.local.system.compare.set(this.storage);
  }

  public get distance(): number {
    return this.storage.distance || 100;
  }
  public set distance(v: number) {
    this.changed.distance = true;
    this.storage.distance = v;
    this.local.system.compare.set(this.storage);
  }

  private changed = {
    ratio: false,
    distance: false,
  };
  private original = {
    ratio: 0,
    distance: 0,
  };

  constructor(private local: LocalStorage) {
    this.storage = local.system.compare.get();
    this.init();
  }

  private storage: ISystemCompareStorage;

  private init() {
    this.original.ratio = this.ratio;
    this.original.distance = this.distance;
  }

  reset() {
    if (this.changed.ratio) {
      this.ratio = this.original.ratio;
    }
    if (this.changed.distance) {
      this.distance = this.original.distance;
    }
  }
}
