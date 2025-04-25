import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorage {
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
      window.onbeforeunload = null;
    }
  }
}
