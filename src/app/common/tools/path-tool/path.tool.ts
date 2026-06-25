import { Injectable } from '@angular/core';
import { LocalStorage } from '../../storage/local.storage';
import { ConfigPath } from './config.path';
import { PathImageTool } from './path-image.tool';

@Injectable({
  providedIn: 'root',
})
export class PathTool {
  static image = new PathImageTool();
  static config = new ConfigPath();
  static record(url: string = '') {
    return `api/ver10/${url}`;
  }

  constructor(local: LocalStorage) {
    this.image = new PathImageTool(local);
  }

  image: PathImageTool;
  config = new ConfigPath();
  record(url: string = '') {
    return PathTool.record(url);
  }
}
