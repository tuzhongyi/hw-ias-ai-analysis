import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { ComponentTool } from '../../../../../../../common/tools/component-tool/component.tool';
import { SystemTaskRoadObjectAMapController } from './amap/system-task-road-object-amap.controller';

export class SystemTaskRoadObjectMapController {
  constructor(tool: ComponentTool, subscription: Subscription) {
    this.controller = new SystemTaskRoadObjectAMapController(
      tool,
      subscription
    );
    this.regist.object(subscription);
  }

  private controller: SystemTaskRoadObjectAMapController;

  private regist = {
    object: async (subscription: Subscription) => {
      let ctr = await this.controller.road.object;
      let sub_click = ctr.event.click.subscribe((data) => {
        this.road.event.click.emit(data);
      });
      subscription.add(sub_click);
      let sub_dblclick = ctr.event.dblclick.subscribe((data) => {
        this.road.event.dblclick.emit(data);
      });
      subscription.add(sub_dblclick);
    },
  };

  road = {
    event: {
      click: new EventEmitter<RoadObject>(),
      dblclick: new EventEmitter<RoadObject>(),
    },
    object: {
      load: async (datas: RoadObject[]) => {
        let ctr = await this.controller.road.object;
        return ctr.load(datas);
      },
      clear: async () => {
        let ctr = await this.controller.road.object;
        return ctr.clear();
      },
      select: async (data: RoadObject) => {
        let ctr = await this.controller.road.object;

        if (ctr.select(data)) {
          let map = await this.controller.map;
          map.setZoom(19);
          let gcj02 = data.Location.GCJ02;
          let position = [gcj02.Longitude, gcj02.Latitude] as [number, number];
          map.setCenter(position);
        }
      },
      hover: async (data: RoadObject) => {
        let ctr = await this.controller.road.object;
        ctr.hover(data);
      },
      leave: async (data: RoadObject) => {
        let ctr = await this.controller.road.object;
        ctr.leave(data);
      },
    },
    section: {
      load: async (datas: RoadSection[]) => {
        let ctr = await this.controller.road.section;
        return ctr.load(datas);
      },
      clear: async () => {
        let ctr = await this.controller.road.section;
        return ctr.clear();
      },
    },
    point: {
      load: async (datas: RoadPoint[]) => {
        let ctr = await this.controller.road.point;
        return ctr.load(datas);
      },
      clear: async () => {
        let ctr = await this.controller.road.point;
        return ctr.clear();
      },
    },
  };

  info = {
    remove: async () => {
      let ctr = await this.controller.info;
      ctr.remove();
    },
  };

  map = {
    focus: async (data?: any) => {
      let ctr = await this.controller.map;
      ctr.setFitView(data, true);
    },
    destroy: async () => {
      await this.road.object.clear();
      await this.road.point.clear();
      await this.road.section.clear();
      let ctr = await this.controller.map;
      ctr.destroy();
    },
  };
}
