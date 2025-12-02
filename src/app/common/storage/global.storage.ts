import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorage {
  version = '1.0.6.8';
  unload = new EventEmitter<void>();

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
