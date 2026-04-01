import { Duration, DurationUnit } from '../../date-time-tool/duration.model';

export class ChartAxisXTool {
  weeks(first = 1) {
    let numbers = ['日', '一', '二', '三', '四', '五', '六'];
    let weeks = [];
    for (let i = first; i < numbers.length; i++) {
      weeks.push(`周${numbers[i]}`);
    }

    for (let i = 0; i < first; i++) {
      weeks.push(`周${numbers[i]}`);
    }
    return weeks;
  }
  hours(end = true) {
    let hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }

    if (end) {
      hours.push('24:00');
    }

    return hours;
  }
  dates(date = new Date()) {
    let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let dates = [];
    for (let i = 1; i <= days; i++) {
      dates.push(i < 10 ? `0${i}` : `${i}`);
    }
    return dates;
  }
  months() {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i < 10 ? `0${i}` : `${i}`);
    }
    return months;
  }

  unit(
    unit: DurationUnit,
    opts?: { end?: boolean; date?: Date; first?: number }
  ) {
    switch (unit) {
      case DurationUnit.day:
        return this.hours(opts?.end);
      case DurationUnit.week:
        return this.weeks(opts?.first);
      case DurationUnit.month:
        return this.dates(opts?.date);
      case DurationUnit.year:
        return this.months();
      default:
        return [];
    }
  }

  last = {
    unit: (unit: DurationUnit, duration: Duration) => {
      switch (unit) {
        case DurationUnit.week:
          return this.last.week(duration);
        case DurationUnit.month:
          return this.last.month(duration);
        case DurationUnit.year:
          return this.last.year(duration);
        default:
          throw new Error('不支持的时间单位');
      }
    },
    week: (duration: Duration) => {
      let current = new Date(duration.begin.getTime());
      let numbers = ['日', '一', '二', '三', '四', '五', '六'];
      let days = [];
      while (current.getTime() < duration.end.getTime()) {
        days.push(current.getDay());
        current.setDate(current.getDate() + 1);
      }

      return days.map((d) => `周${numbers[d]}`);
    },
    month: (duration: Duration) => {
      let current = new Date(duration.begin.getTime());
      let days = [];
      while (current.getTime() < duration.end.getTime()) {
        days.push(current.getDate());
        current.setDate(current.getDate() + 1);
      }

      return days.map((d) => (d < 10 ? `0${d}` : `${d}`));
    },
    year: (duration: Duration) => {
      let current = new Date(duration.begin.getTime());
      let months = [];
      while (current.getTime() < duration.end.getTime()) {
        months.push(current.getMonth() + 1);
        current.setMonth(current.getMonth() + 1);
      }

      return months.map((x) => `${x}月`);
    },
  };
}
