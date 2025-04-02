import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../../../common/storage/local.storage';
import { ISystemMapStorage } from '../../../../../../common/storage/system-map-storage/system-map.storage';

@Injectable()
export class SystemMapTaskManagerShopTaskController {
  show = false;

  private _count: number = 2;
  public get count(): number {
    return this._count;
  }
  public set count(v: number) {
    this._count = v;
    if (!this.storage) {
      this.storage = new ISystemMapStorage();
    }
    this.storage.mintaskcount = v;
    this.local.system.map.set(this.storage);
  }

  constructor(private local: LocalStorage) {
    this.init();
  }

  private storage?: ISystemMapStorage;

  private init() {
    this.storage = this.local.system.map.get();
    if (this.storage) {
      this._count = this.storage.mintaskcount;
    }
  }

  target(e: Event) {
    this.show = !this.show;
    e.stopImmediatePropagation();
  }
  close() {
    this.show = false;
  }

  stop(e: Event) {
    e.stopImmediatePropagation();
  }
}
