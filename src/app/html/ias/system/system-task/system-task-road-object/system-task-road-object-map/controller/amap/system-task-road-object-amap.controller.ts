import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ComponentTool } from '../../../../../../../../common/tools/component-tool/component.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';

export class SystemTaskRoadObjectAMapController {
  get map() {
    return this.controller.map.get();
  }
  constructor(tool: ComponentTool, subscription: Subscription) {
    MapHelper.amap
      .get('system-task-road-object-map', [], true, {
        showLabel: true,
        viewMode: '3D',
        layers: [], // 彻底移除所有瓦片/格栅
        resizeEnable: true,
        dragEnable: true, // 保留拖拽功能
        zoomEnable: true, // 保留缩放功能
      })
      .then((map) => {});
  }

  private controller = {
    map: new PromiseValue<AMap.Map>(),
  };
}
