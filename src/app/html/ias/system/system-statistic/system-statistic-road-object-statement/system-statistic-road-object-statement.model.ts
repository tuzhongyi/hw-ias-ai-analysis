export class RoadObjectStatementModel {
  name = '';
  value = 0;
  ratio = 0;
}

export class MobileDeviceStatementModel {
  id = '';
  name = '';
  coverage: number = 0;
  attendance = new Attendance();
  distance = new Distance(this.attendance);
  duration = new Duration(this.attendance);
}

class Attendance {
  get count() {
    let count = 0;
    this.days.forEach((x) => {
      if (x) {
        count++;
      }
    });
    return count;
  }
  days: Map<number, boolean> = new Map();
}
class Distance {
  constructor(private attendance: Attendance) {}
  total = 0;
  get average() {
    return this.attendance.count > 0 ? this.total / this.attendance.count : 0;
  }
}
class Duration {
  constructor(private attendance: Attendance) {}
  total = 0;
  get average() {
    return this.attendance.count > 0 ? this.total / this.attendance.count : 0;
  }
}
