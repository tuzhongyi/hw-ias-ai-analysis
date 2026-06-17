import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { Manager } from '../../../../../../../../common/data-core/requests/managers/manager';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ComponentTool } from '../../../../../../../../common/tools/component-tool/component.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapPathPulseItemController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path-pulse-item.controller';
import { IASMapAMapPathWayController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path-way.controller';
import { IASMapAMapPathController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path.controller';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemStatisticRoadObjectAMapRecordInfoDetailsController } from './record/info/system-statistic-road-object-amap-record-info-details.controller';
import { SystemStatisticRoadObjectAMapRecordInfoSimpleController } from './record/info/system-statistic-road-object-amap-record-info-simple.controller';
import { SystemStatisticRoadObjectAMapRecordMarkerClusterController } from './record/marker/system-statistic-road-object-amap-record-marker-cluster.controller';
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
      cluster: this.controller.record.cluster.get(),
      info: {
        details: this.controller.record.info.details.get(),
        simple: this.controller.record.info.simple.get(),
      },
    };
  }
  get way() {
    return this.controller.way.get();
  }

  constructor(
    tool: ComponentTool,
    subscription: Subscription,
    manager: Manager,
  ) {
    MapHelper.amap
      .get('system-statistic-road-object-map', [], true, {
        showLabel: true, // 隐藏所有标签
        viewMode: '3D',
        // mapStyle: MapHelper.amap.style.url(MapHelper.amap.style.key.road),
        layers: [], // 彻底移除所有瓦片/格栅
        resizeEnable: true,
        dragEnable: true, // 保留拖拽功能
        zoomEnable: true, // 保留缩放功能
      })
      .then((map) => {
        this.init.map(map);

        let container = this.init.container(map);

        this.init.road(map, container);

        this.init.record(map, tool, subscription, manager);

        this.init.path(map, container);
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
      info: {
        details:
          new PromiseValue<SystemStatisticRoadObjectAMapRecordInfoDetailsController>(),
        simple:
          new PromiseValue<SystemStatisticRoadObjectAMapRecordInfoSimpleController>(),
      },
      cluster:
        new PromiseValue<SystemStatisticRoadObjectAMapRecordMarkerClusterController>(),
    },
    path: new PromiseValue<IASMapAMapPathPulseItemController>(),
    way: new PromiseValue<IASMapAMapPathWayController>(),
  };

  private init = {
    map: (map: AMap.Map) => {
      this.controller.map.set(map);

      map.on('click', (e) => {
        this.record.info.details.then((x) => {
          x.close();
        });
        this.record.info.simple.then((x) => {
          x.remove();
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
      subscription: Subscription,
      manager: Manager,
    ) => {
      let cluster =
        new SystemStatisticRoadObjectAMapRecordMarkerClusterController(manager);
      this.controller.record.cluster.set(cluster);

      let marker = new SystemStatisticRoadObjectAMapRecordMarkerLayerController(
        map,
        subscription,
        manager,
        cluster,
      );

      this.controller.record.marker.set(marker);
      let info_details =
        new SystemStatisticRoadObjectAMapRecordInfoDetailsController(
          map,
          tool,
          subscription,
        );
      this.controller.record.info.details.set(info_details);
      let info_simple =
        new SystemStatisticRoadObjectAMapRecordInfoSimpleController(map, tool);
      this.controller.record.info.simple.set(info_simple);
    },
    path: (map: AMap.Map, container: Loca.Container) => {
      let ctr = new IASMapAMapPathPulseItemController(map, container);
      this.controller.path.set(ctr);
    },
    way: (map: AMap.Map) => {
      let ctr = new IASMapAMapPathWayController(map);
      this.controller.way.set(ctr);
    },
  };

  private _path: IASMapAMapPathController[] = [];
  private _polylines: AMap.Polyline[] = [];
  get polylines() {
    return this._polylines;
  }
  path = {
    load: async (datas: FileGpsItem[][]) => {
      let map = await this.controller.map.get();

      let container = await this.controller.container.get();
      let points: [number, number][] = [];
      let polylines = datas
        .map((items, i) => {
          let positions = items.map(
            (x) => [x.Longitude, x.Latitude] as [number, number],
          );
          points.push(...positions);
          let type = items.every((x) => !!x.HighPrecision) ? 1 : 0;
          let path = new IASMapAMapPathController(map, type);

          this._path.push(path);
          return path.load(positions, false, false, true)!;
        })
        .filter((x) => !!x);

      this._polylines = polylines;

      let head = await this.controller.path.get();
      head.load(points);
      container.animate.start();
    },
    clear: async () => {
      this._path.forEach((x) => {
        x.clear();
      });
      this._path = [];
      this._polylines = [];

      let head = await this.controller.path.get();
      head.clear();
      let container = await this.controller.container.get();
      container.animate.stop();
    },
  };
}
