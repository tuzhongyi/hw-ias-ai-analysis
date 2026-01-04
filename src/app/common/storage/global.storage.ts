import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorage {
  version = '1.0.9.1';
  unload = new EventEmitter<void>();

  display = {
    task: {
      shop: false,
      gps: false,
    },
    module: {
      shop: false,
      road: false,
      route: false,
    },
    record: {
      shop: false,
      realtime: false,
      gps: false,
    },
  };

  constructor() {
    window.onbeforeunload = () => {
      console.log('onbeforeinput');
      this.unload.emit();
    };
  }

  private _uploading: boolean = false;
  public get uploading(): boolean {
    return this._uploading;
  }
  public set uploading(v: boolean) {
    if (this._uploading === v) return;
    this._uploading = v;
    if (this._uploading) {
      window.onbeforeunload = (e) => {
        confirm('是否关闭当前页面？');
        return false;
      };
    } else {
      window.onbeforeunload = () => {
        this.unload.emit();
      };
    }
  }
}
