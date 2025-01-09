import { formatDate } from '@angular/common';
import { Duration } from '../../tools/date-time-tool/duration.model';
import { Language } from '../../tools/language';

export class SystemTaskDurationStorage {
  key = 'system-task-duration';

  get() {
    let str = localStorage.getItem(this.key);
    if (str) {
      let str_date = JSON.parse(str);
      let duration = {
        begin: new Date(str_date.begin),
        end: new Date(str_date.end),
      };
      return duration;
    }

    return undefined;
  }
  set(value: Duration) {
    let str_date = {
      begin: formatDate(value.begin, Language.yyyyMMddHHmmss, 'en'),
      end: formatDate(value.end, Language.yyyyMMddHHmmss, 'en'),
    };
    let str = JSON.stringify(str_date);
    localStorage.setItem(this.key, str);
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
