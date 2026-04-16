import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ComponentTool } from '../../../../../../../../common/tools/component-tool/component.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapPathWayController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path-way.controller';
import { IASMapAMapPathController } from '../../../../../../share/map/controller/amap/path/ias-map-amap-path.controller';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemStatisticRoadObjectAMapRecordInfoDetailsController } from './record/info/system-statistic-road-object-amap-record-info-details.controller';
import { SystemStatisticRoadObjectAMapRecordInfoSimpleController } from './record/info/system-statistic-road-object-amap-record-info-simple.controller';
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
      info: {
        details: this.controller.record.info.details.get(),
        simple: this.controller.record.info.simple.get(),
      },
    };
  }
  get way() {
    return this.controller.way.get();
  }

  constructor(tool: ComponentTool, subscription: Subscription) {
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
      info: {
        details:
          new PromiseValue<SystemStatisticRoadObjectAMapRecordInfoDetailsController>(),
        simple:
          new PromiseValue<SystemStatisticRoadObjectAMapRecordInfoSimpleController>(),
      },
    },
    path: new PromiseValue<IASMapAMapPathController>(),
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
      subscription: Subscription
    ) => {
      let marker = new SystemStatisticRoadObjectAMapRecordMarkerLayerController(
        map,
        subscription
      );

      this.controller.record.marker.set(marker);
      let info_details =
        new SystemStatisticRoadObjectAMapRecordInfoDetailsController(
          map,
          tool,
          subscription
        );
      this.controller.record.info.details.set(info_details);
      let info_simple =
        new SystemStatisticRoadObjectAMapRecordInfoSimpleController(map, tool);
      this.controller.record.info.simple.set(info_simple);
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

  private _path: IASMapAMapPathController[] = [];
  path = {
    load: async (datas: FileGpsItem[][], focus: boolean) => {
      let map = await this.controller.map.get();

      let polylines = datas
        .map((items, i) => {
          let positions = items.map(
            (x) => [x.Longitude, x.Latitude] as [number, number]
          );
          let type = items.every((x) => !!x.HighPrecision) ? 1 : 0;
          let path = new IASMapAMapPathController(map, type);

          this._path.push(path);
          return path.load(positions, false)!;
        })
        .filter((x) => !!x);

      if (focus) {
        map.setFitView(polylines, true);
        setTimeout(() => {
          map.setFitView(polylines, true);
        }, 2 * 1000);
      }
    },
    clear: () => {
      this._path.forEach((x) => {
        x.clear();
      });
      this._path = [];
    },
  };
}
