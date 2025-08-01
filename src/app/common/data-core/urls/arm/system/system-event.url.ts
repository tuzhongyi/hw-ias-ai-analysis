import { AbstractUrl } from '../../abstract.url';
import { SystemEventHandleUrl } from './system-event-handle.url';

export class SystemEventUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Events`);
  }
  misinfo(id: string) {
    return `${this.item(id)}/Misinfo`;
  }
  assgin(id: string) {
    return `${this.item(id)}/Assgin`;
  }
  capability() {
    return `${this.basic()}/Capability`;
  }
  record = {
    file: (id: string) => {
      return `${this.item(id)}/RecordFile.mkv`;
    },
  };
  gps = {
    items: (id: string, rectified?: boolean) => {
      let query = '';
      if (rectified) {
        query = `?rectified=${rectified}`;
      }
      return `${this.item(id)}/GpsItems${query}`;
    },
  };

  handle(id: string) {
    return new SystemEventHandleUrl(this.item(id));
  }
}
