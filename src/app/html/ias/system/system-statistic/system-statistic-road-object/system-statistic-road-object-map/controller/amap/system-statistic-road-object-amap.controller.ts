import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ComponentTool } from '../../../../../../../../common/tools/component-tool/component.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapPathWayController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path-way.controller';
import { IASMapAMapPathController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path.controller';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemStatisticRoadObjectAMapRecordInfoController } from './record/info/system-statistic-road-object-amap-record-info.controller';
import { SystemStatisticRoadObjectAMapRecordMarkerLayerController } from './record/marker/system-statistic-road-object-amap-record-marker-layer.controller';

export class SystemStatisticRoadObjectAMapController {
  get road() {
    return this.controller.road.get();
  }
  get map() {
    return this.controller.map.get();
  }
  get record() {
    return {
      marker: this.controller.record.marker.get(),
      info: this.controller.record.info.get(),
    };
  }
  get path() {
    return this.controller.path.get();
  }
  get way() {
    return this.controller.way.get();
  }

  constructor(tool: ComponentTool, subscription: Subscription) {
    MapHelper.amap
      .get('system-statistic-road-object-map', [], true, {
        showLabel: false, // 隐藏所有标签
        viewMode: '2D',

        layers: [], // 彻底移除所有瓦片/格栅
        resizeEnable: true,
        dragEnable: true, // 保留拖拽功能
        zoomEnable: true, // 保留缩放功能

        showIndoorMap: false,
        // 核心：地图容器背景透明（兜底）
        mapStyle: 'amap://styles/transparent', // 高德官方透明样式
      })
      .then((map) => {
        this.init.map(map);

        let container = this.init.container(map);

        this.init.road(map, container);

        this.init.record(map, tool, subscription);

        this.init.path(map);
        this.init.way(map);
      });
  }
  private controller = {
    map: new PromiseValue<AMap.Map>(),
    container: new PromiseValue<Loca.Container>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
    record: {
      marker:
        new PromiseValue<SystemStatisticRoadObjectAMapRecordMarkerLayerController>(),
      info: new PromiseValue<SystemStatisticRoadObjectAMapRecordInfoController>(),
    },
    path: new PromiseValue<IASMapAMapPathController>(),
    way: new PromiseValue<IASMapAMapPathWayController>(),
  };

  private init = {
    map: (map: AMap.Map) => {
      map.setFeatures([]);
      this.controller.map.set(map);

      map.on('click', (e) => {
        this.record.info.then((x) => {
          x.close();
        });
      });
    },
    container: (map: AMap.Map) => {
      let container = new Loca.Container({ map: map });
      this.controller.container.set(container);
      return container;
    },
    road: (map: AMap.Map, loca: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, loca);
      this.controller.road.set(ctr);
    },
    record: (
      map: AMap.Map,
      tool: ComponentTool,
      subscription: Subscription
    ) => {
      let marker = new SystemStatisticRoadObjectAMapRecordMarkerLayerController(
        map,
        tool
      );
      this.controller.record.marker.set(marker);
      let info = new SystemStatisticRoadObjectAMapRecordInfoController(
        map,
        tool,
        subscription
      );
      this.controller.record.info.set(info);
    },
    path: (map: AMap.Map) => {
      let ctr = new IASMapAMapPathController(map);
      this.controller.path.set(ctr);
    },
    way: (map: AMap.Map) => {
      let ctr = new IASMapAMapPathWayController(map);
      this.controller.way.set(ctr);
    },
  };
}
