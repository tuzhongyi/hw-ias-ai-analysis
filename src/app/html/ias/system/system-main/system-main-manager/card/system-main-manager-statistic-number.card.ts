import { SystemMainManagerWindow } from '../window/system-main-manager.window';

export class SystemMainManagerCardStatisticNumber {
  show = false;
  constructor(private window: SystemMainManagerWindow) {}
  on = {
    item: (type: string) => {
      switch (type) {
        case 'shop':
          break;
        case 'road':
          break;
        case 'device':
          break;
        case 'task':
          break;
        default:
          break;
      }
    },
  };
}
