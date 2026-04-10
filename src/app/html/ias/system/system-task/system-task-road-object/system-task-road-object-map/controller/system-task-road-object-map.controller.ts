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
  }

  private controller: SystemTaskRoadObjectAMapController;

  road = {
    object: {
      load: async (datas: RoadObject[]) => {
        let ctr = await this.controller.road.object;
        return ctr.load(datas);
      },
      clear: async () => {
        let ctr = await this.controller.road.object;
        return ctr.clear();
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
