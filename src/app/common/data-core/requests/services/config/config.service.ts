import { Injectable } from '@angular/core';
import { LocalStorage } from '../../../../storage/local.storage';
import { PathTool } from '../../../../tools/path-tool/path.tool';

@Injectable({
  providedIn: 'root',
})
export class ConfigRequestService {
  constructor(private local: LocalStorage) {}

  version() {
    return new Promise<string>((resolve) => {
      fetch(`${PathTool.config.version}?t=${new Date().getTime()}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data.version);
        });
    });
  }

  location() {
    return new Promise<[number, number] | undefined>((resolve) => {
      fetch(`${PathTool.config.location}?t=${new Date().getTime()}`)
        .then((res) => res.json())
        .then((datas) => {
          let username = this.local.auth.get().username;
          let data = datas.find((x: any) => x.name === username);
          if (data) {
            resolve(data.center);
          } else {
            resolve(undefined);
          }
        });
    });
  }
}
