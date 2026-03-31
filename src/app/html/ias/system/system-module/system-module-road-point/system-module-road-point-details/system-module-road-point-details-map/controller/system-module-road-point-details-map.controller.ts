import { Subscription } from 'rxjs';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadPointDetailsAMapController } from './amap/system-module-road-point-details-amap.controller';

export class SystemModuleRoadPointDetailsMapController {
  get event() {
    return this.controller.event;
  }
  constructor(subscription: Subscription) {
    this.controller = new SystemModuleRoadPointDetailsAMapController(
      subscription
    );
  }
  private controller: SystemModuleRoadPointDetailsAMapController;

  road = {
    load: async (datas: Road[]) => {
      let road = await this.controller.road.get();
      return road.load(datas);
    },
    clear: async () => {
      let road = await this.controller.road.get();
      road.clear();
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
    move: async (center: [number, number]) => {
      let ctr = await this.controller.map.get();
      ctr.setCenter(center);
    },
    focus: async (data?: any, immediately?: boolean) => {
      let ctr = await this.controller.map.get();
      ctr.setFitView(data, immediately);
      let center = ctr.getCenter();
      return [center.lng, center.lat] as [number, number];
    },
    destroy: async () => {
      await this.circle.clear();
      let ctr = await this.controller.map.get();
      ctr.destroy();
    },
  };
}
