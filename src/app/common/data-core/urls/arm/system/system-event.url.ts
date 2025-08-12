import {
  GetMobileEventFileGpsItemsParams,
  GetMobileEventFileParams,
} from '../../../requests/services/system/event/system-event.params';
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
    file: (id: string, params: GetMobileEventFileParams) => {
      let query = params.to.query();
      if (query) {
        query = `?${query}`;
      }
      return `${this.item(id)}/RecordFile.mkv${query}`;
    },
  };
  gps = {
    items: (id: string, params: GetMobileEventFileGpsItemsParams) => {
      let query = params.to.query();
      if (query) {
        query = `?${query}`;
      }
      return `${this.item(id)}/GpsItems${query}`;
    },
  };

  handle(id: string) {
    return new SystemEventHandleUrl(this.item(id));
  }
}
