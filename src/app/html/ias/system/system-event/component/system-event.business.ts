import { Injectable } from '@angular/core';
import { SystemPath } from '../../system.model';

@Injectable()
export class SystemEventBusiness {
  constructor() {}

  load(): string {
    let title = '';
    if (location.pathname.indexOf(SystemPath.event) >= 0) {
      title = 'AI分析事件';
    }
    return title;
  }
}
