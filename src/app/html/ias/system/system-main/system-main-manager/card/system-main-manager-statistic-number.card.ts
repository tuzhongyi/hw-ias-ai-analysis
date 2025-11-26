import { SystemMainManagerComponent } from '../system-main-manager.component';

export class SystemMainManagerCardStatisticNumber {
  show = false;
  constructor(private that: SystemMainManagerComponent) {}
  on = {
    item: (type: string) => {
      console.log(type);
      switch (type) {
        case 'shop':
          this.that.window.shop.show = true;
          break;
        case 'road':
          this.that.window.road.show = true;
          break;
        case 'device':
          break;
        case 'task':
          this.that.window.task.gps.show = true;
          break;
        default:
          break;
      }
    },
  };
}
