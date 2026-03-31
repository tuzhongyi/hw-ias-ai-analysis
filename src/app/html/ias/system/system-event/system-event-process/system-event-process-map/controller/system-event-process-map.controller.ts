import { Subscription } from 'rxjs';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventProcessAMapController } from './amap/system-event-process-amap.controller';

export class SystemEventProcessMapController {
  get event() {
    return this.controller.event;
  }
  constructor(subscription: Subscription) {
    this.controller = new SystemEventProcessAMapController(subscription);
  }
  private controller: SystemEventProcessAMapController;

  marker = {
    add: async (data: MobileEventRecord) => {
      let ctr = await this.controller.marker.get();
      return ctr.add(data);
    },
    remove: async () => {
      let ctr = await this.controller.marker.get();
      ctr.remove();
    },
  };

  circle = {
    args: undefined as
      | { radius?: number; center?: [number, number] }
      | undefined,
    open: async () => {
      let ctr = await this.controller.circle.get();
      let circle = ctr.circle.get();
      if (!circle) {
        circle = ctr.circle.create(this.circle.args);
      }
      ctr.open();
    },
    close: async () => {
      let ctr = await this.controller.circle.get();
      ctr.close();
    },
    set: async (args: { radius?: number; center?: [number, number] }) => {
      this.circle.args = args;
      let ctr = await this.controller.circle.get();
      let circle = ctr.circle.get();
      if (!circle) {
        circle = ctr.circle.create(args);
      }
      ctr.set(args);
    },
    clear: async () => {
      let ctr = await this.controller.circle.get();
      ctr.close();
      ctr.circle.remove();
    },
  };

  map = {
    focus: async (data?: any) => {
      let ctr = await this.controller.map.get();
      ctr.setFitView(data);
    },
    destroy: async () => {
      await this.marker.remove();
      await this.circle.clear();
      let ctr = await this.controller.map.get();
      ctr.destroy();
    },
  };
}
