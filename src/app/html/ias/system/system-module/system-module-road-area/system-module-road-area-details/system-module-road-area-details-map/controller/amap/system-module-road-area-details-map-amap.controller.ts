import { EventEmitter, Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../../../../common/data-core/models/arm/gis-point.model';
import { RoadArea } from '../../../../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { LastResortTool } from '../../../../../../../../../common/tools/last-resort-tool/last-resort.tool';
import { SystemModuleRoadAreaDetailsMapAMapAreasController } from './system-module-road-area-details-map-amap-areas.controller';
import { SystemModuleRoadAreaDetailsMapAMapCreatorController } from './creator/system-module-road-area-details-map-amap-creator.controller';
import { SystemModuleRoadAreaDetailsMapAMapEditorController } from './editor/system-module-road-area-details-map-amap-editor.controller';
import { SystemModuleRoadAreaDetailsMapAMapPolygonController } from './system-module-road-area-details-map-amap-polygon.controller';

@Injectable()
export class SystemModuleRoadAreaDetailsMapAMapController {
  event = {
    mousemove: new EventEmitter<[number, number]>(),
    mouseout: new EventEmitter<void>(),
    change: new EventEmitter<[number, number][]>(),
    click: new EventEmitter<[number, number]>(),
  };

  creator =
    new PromiseValue<SystemModuleRoadAreaDetailsMapAMapCreatorController>();
  editor =
    new PromiseValue<SystemModuleRoadAreaDetailsMapAMapEditorController>();
  road = new PromiseValue<IASMapAMapRoadController>();
  constructor() {
    this.init();
  }

  private init() {
    MapHelper.amap
      .get(
        'system-module-road-area-details-map',
        [...MapHelper.amap.plugins, 'AMap.PolygonEditor'],
        true,
      )
      .then((map) => {
        map.setZoom(17);
        let container = new Loca.Container({ map: map });
        this.map.set(map);
        this.regist(map);
        let polygon = new SystemModuleRoadAreaDetailsMapAMapPolygonController(
          map,
        );
        this.polygon.set(polygon);

        this.areas.set(
          new SystemModuleRoadAreaDetailsMapAMapAreasController(map),
        );

        this.creator.set(
          new SystemModuleRoadAreaDetailsMapAMapCreatorController(map),
        );
        this.editor.set(
          new SystemModuleRoadAreaDetailsMapAMapEditorController(map, polygon),
        );
        let road = new IASMapAMapRoadController(map, container);
        this.road.set(road);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private polygon =
    new PromiseValue<SystemModuleRoadAreaDetailsMapAMapPolygonController>();
  private areas =
    new PromiseValue<SystemModuleRoadAreaDetailsMapAMapAreasController>();
  private last = new LastResortTool();

  /**
   * 最后一次由数据接管视野的动作。城市兜底是异步落地的
   * （setCity 要先把城市边界拉回来再摆视野），可能晚于数据的 fitView，
   * 那时就把视野再摆回去。
   */
  private takeover?: () => void;

  /** 视野已被数据接管 → 取消城市兜底。传 restore 就顺手记住怎么把视野摆回来 */
  claim(restore?: () => void) {
    this.last.claim();
    if (restore) {
      this.takeover = restore;
    }
  }

  private regist(map: AMap.Map) {
    map.on('mousemove', (e) => {
      this.event.mousemove.emit([e.lnglat.lng, e.lnglat.lat]);
    });
    map.on('mouseout', () => {
      this.event.mouseout.emit();
    });
    map.on('click', (e) => {
      this.event.click.emit([e.lnglat.lng, e.lnglat.lat]);
    });
  }

  async load(datas: GisPoint[]) {
    let map = await this.map.get();
    let polygon = await this.polygon.get();
    polygon.clear();

    let positions = datas.map<[number, number]>((x) => {
      return [x.Longitude, x.Latitude];
    });
    polygon.add(positions);
    return polygon.get();
  }

  /** 已有区域参考层（新建时才铺） */
  loadareas(datas: RoadArea[]) {
    return this.areas.get().then((x) => {
      x.load(datas);
    });
  }

  focus(datas?: any) {
    return this.map.get().then((x) => {
      // 数据接管视野：顺手把「怎么摆回这批数据」交给城市兜底
      let from = () => {
        x.setFitView(datas, true);
        let center = x.getCenter();

        x.setZoom(17);
        x.setPitch(40);
        x.setCenter(center);
      };
      this.claim(from);
      from();
      return;
    });
  }
  city(value: string) {
    return new Promise<void>((resolve) => {
      this.last.fallback(() => {
        this.map.get().then((x) => {
          // 等地图的这些时间里，可能已经有别的数据接管了视野
          if (this.last.claimed) {
            resolve();
            return;
          }
          x.setCity(value, () => {
            // setCity 的回调同样可能落在数据的 fitView 之后 ——
            // 那就说明视野已经被数据接管了，把地图还给数据，别再往城市上摆
            if (this.last.claimed) {
              this.takeover?.();
              resolve();
              return;
            }
            x.setZoom(17);
            resolve();
          });
        });
      });
    });
  }
  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
