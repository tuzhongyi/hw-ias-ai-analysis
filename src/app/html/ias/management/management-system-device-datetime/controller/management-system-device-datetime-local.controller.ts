import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Language } from '../../../../../common/tools/language-tool/language';

@Injectable()
export class ManagementSystemDeviceDatetimeLocalController {
  date = new Date();
  time = formatDate(this.date, Language.HHmmss, 'en');

  private _sync: boolean = false;
  public get sync(): boolean {
    return this._sync;
  }
  public set sync(v: boolean) {
    this._sync = v;
    if (this._sync) {
      this.start();
    } else {
      this.stop();
    }
  }

  private handle?: NodeJS.Timeout;

  private start() {
    this.handle = setInterval(() => {
      this.date = new Date();
      this.time = formatDate(this.date, Language.HHmmss, 'en');
    }, 1000);
  }
  private stop() {
    if (this.handle) {
      clearInterval(this.handle);
      this.handle = undefined;
    }
  }
}
