import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ComponentTool } from '../../../../../../../../common/tools/component-tool/component.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { SystemTaskRoadObjectAMapObjectController } from './road-object/system-task-road-object-amap-object.controller';
import { SystemTaskRoadObjectAMapPointController } from './road-point/system-task-road-object-amap-point.controller';
import { SystemTaskRoadObjectAMapSectionController } from './road-section/system-task-road-object-amap-section.controller';

export class SystemTaskRoadObjectAMapController {
  get map() {
    return this.controller.map.get();
  }
  get road() {
    return {
      object: this.controller.object.get(),
      section: this.controller.section.get(),
      point: this.controller.point.get(),
    };
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
        pitch: 40,
      })
      .then((map) => {
        let container = this.init.map(map);
        let info = this.init.info(map);
        this.init.road.object(map, container, info, subscription);
        this.init.road.section(map);
        this.init.road.point(map, container);
      });
  }

  private controller = {
    map: new PromiseValue<AMap.Map>(),
    info: new PromiseValue<IASMapAMapInfoController>(),
    object: new PromiseValue<SystemTaskRoadObjectAMapObjectController>(),
    section: new PromiseValue<SystemTaskRoadObjectAMapSectionController>(),
    point: new PromiseValue<SystemTaskRoadObjectAMapPointController>(),
  };

  private init = {
    map: (map: AMap.Map) => {
      this.controller.map.set(map);
      let container = new Loca.Container({ map });
      return container;
    },
    info: (map: AMap.Map) => {
      let ctr = new IASMapAMapInfoController(map);
      this.controller.info.set(ctr);
      return ctr;
    },
    road: {
      object: (
        map: AMap.Map,
        container: Loca.Container,
        info: IASMapAMapInfoController,
        subscription: Subscription
      ) => {
        let ctr = new SystemTaskRoadObjectAMapObjectController(
          map,
          container,
          info,
          subscription
        );
        this.controller.object.set(ctr);
      },
      section: (map: AMap.Map) => {
        let ctr = new SystemTaskRoadObjectAMapSectionController(map);
        this.controller.section.set(ctr);
      },
      point: (map: AMap.Map, container: Loca.Container) => {
        let ctr = new SystemTaskRoadObjectAMapPointController(container);
        this.controller.point.set(ctr);
      },
    },
  };
}
