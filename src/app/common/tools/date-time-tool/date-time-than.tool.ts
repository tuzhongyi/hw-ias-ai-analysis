import { Duration } from './duration.model';

export class DateTimeThanTool {
  /** 判断时间区间的跨度是否小于指定秒数 */
  less(duration: Duration, seconds: number): boolean {
    let span = (duration.end.getTime() - duration.begin.getTime()) / 1000;
    return span < seconds;
  }
}
