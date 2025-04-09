import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';
import { ISystemMapStorage } from '../../../../../../../common/storage/system-map-storage/system-map.storage';

@Injectable()
export class SystemMapSettingCompareRegistrationController {
  public get ratio(): number {
    return this.config.ratio * 100 || 50;
  }
  public set ratio(v: number) {
    this.changed.ratio = true;
    this.config.ratio = v / 100;
    this.local.system.map.set(this.config);
  }

  public get distance(): number {
    return this.config.distance || 100;
  }
  public set distance(v: number) {
    this.changed.distance = true;
    this.config.distance = v;
    this.local.system.map.set(this.config);
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
    this.config = local.system.map.get();
    this.init();
  }

  private config: ISystemMapStorage;

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
