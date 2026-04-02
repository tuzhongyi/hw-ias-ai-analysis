import { Subscription } from 'rxjs';
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
}
