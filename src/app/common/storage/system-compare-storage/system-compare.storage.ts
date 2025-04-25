export class ISystemCompareStorage {
  ratio = 0.5;
  distance = 100;
  task = new ISystemCompareTaskStorage();
}

export class ISystemCompareTaskStorage {
  count = 0;
  duration = TaskDuration.year;
}
export enum TaskDuration {
  day = 1,
  week,
  month,
  treemonth,
  halfyear,
  year,
}
export class SystemCompareStorage {
  key = 'system-compare';

  get() {
    let str = localStorage.getItem(this.key);
    let model: ISystemCompareStorage;
    if (str) {
      model = JSON.parse(str) as ISystemCompareStorage;
    } else {
      model = new ISystemCompareStorage();
    }
    return model;
  }
  set(value = new ISystemCompareStorage()) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
