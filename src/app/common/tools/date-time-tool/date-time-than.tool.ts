import { Duration } from './duration.model';

export class DateTimeThanTool {
  less = {
    /** 判断时间区间的跨度是否小于指定秒数 */
    second: (duration: Duration, seconds: number): boolean => {
      let span = (duration.end.getTime() - duration.begin.getTime()) / 1000;
      return span < seconds;
    },
    /** 判断时间区间的跨度是否小于指定月数 */
    month: (duration: Duration, months: number = 1): boolean => {
      let target = new Date(duration.begin);
      target.setMonth(target.getMonth() + months);
      return duration.end < target;
    },
  };
}
