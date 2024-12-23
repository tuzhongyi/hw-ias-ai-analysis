import { DateTimeTool } from './datetime.tool';

export class DateTimeLastTool {
  is(date: Date) {
    let next = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    return next.getDate() === 1;
  }
  day(date: Date, n: number) {
    let begin = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - (n - 1)
    );
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    end.setMilliseconds(-1);
    return { begin, end };
  }
  week(date: Date, n: number = 1) {
    return this.day(date, 7 * n);
  }
  month(date: Date, n: number = 1) {
    if (this.is(date)) {
      return DateTimeTool.all.month(date);
    }

    let begin = new Date(
      date.getFullYear(),
      date.getMonth() - 1 * n,
      date.getDate() + 1
    );
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    end.setMilliseconds(-1);
    return { begin, end };
  }
  year(date: Date, n: number = 1) {
    let begin = new Date(
      date.getFullYear() - 1 * n,
      date.getMonth(),
      date.getDate() + 1
    );
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    end.setMilliseconds(-1);
    return { begin, end };
  }
}
