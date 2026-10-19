import { EventEmitter, Injectable } from '@angular/core';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { LastResortTool } from '../../../../../../../../common/tools/last-resort-tool/last-resort.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemModuleRoadMapAMapCreatorController } from './creator/system-module-road-map-amap-creator.controller';
import { SystemModuleRoadMapAMapEditorController } from './editor/system-module-road-map-amap-editor.controller';
import { SystemModuleRoadMapAMapLabelController } from './system-module-road-map-amap-label.controller';
import { SystemModuleRoadMapAMapPolylineController } from './system-module-road-map-amap-polyline.controller';

@Injectable()
export class SystemModuleRoadMapAMapController {
  event = {
    mousemove: new EventEmitter<[number, number]>(),
    mouseout: new EventEmitter<void>(),
    change: new EventEmitter<[number, number][]>(),
    click: new EventEmitter<[number, number]>(),
  };

  creator = new PromiseValue<SystemModuleRoadMapAMapCreatorController>();
  editor = new PromiseValue<SystemModuleRoadMapAMapEditorController>();

  constructor() {
    MapHelper.amap
      .get('system-module-road-map', [
        ...MapHelper.amap.plugins,
        'AMap.PolylineEditor',
      ])
      .then((x) => {
        this.map.set(x);
        this.regist(x);
        let polyline = new SystemModuleRoadMapAMapPolylineController(x);
        this.polyline.set(polyline);
        this.label.set(new SystemModuleRoadMapAMapLabelController(x));
        this.creator.set(new SystemModuleRoadMapAMapCreatorController(x));
        this.editor.set(
          new SystemModuleRoadMapAMapEditorController(x, polyline)
        );
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private polyline =
    new PromiseValue<SystemModuleRoadMapAMapPolylineController>();
  private label = new PromiseValue<SystemModuleRoadMapAMapLabelController>();

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

  /**
   * 路网一条都没画出来时用当前用户所属城市兜底。
   * 地图建出来时 AMap 的缺省视野在 [0,0]（海面，一张瓦片都没有），
   * 没人给它定过视野的话看着就跟「地图没加载出来」一样
   */
  city(value: string) {
    this.last.fallback(() => {
      this.map.get().then((x) => {
        // 等地图的这些时间里，可能已经有别的数据接管了视野
        if (this.last.claimed) return;
        x.setCity(value, () => {
          // setCity 的回调同样可能落在数据的 fitView 之后 ——
          // 那就说明视野已经被数据接管了，把地图还给数据，别再往城市上摆
          if (this.last.claimed) {
            this.takeover?.();
            return;
          }
          x.setZoom(17);
        });
      });
    });
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

  async load(datas: Road[]) {
    let map = await this.map.get();
    let polyline = await this.polyline.get();
    let label = await this.label.get();
    polyline.clear();
    label.clear();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.GeoLine) {
        let positions = item.GeoLine.map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        polyline.add(item.Id, positions);
        label.add(item);
      }
    }

    // 一条线都没画出来的话别动视野：setFitView() 自适应不到任何东西，
    // 却会把城市兜底 claim 掉，地图就停在空白上再也回不来
    if (polyline.size == 0) {
      return;
    }

    let from = () => {
      map.setFitView();
    };
    this.claim(from);
    from();

    setTimeout(() => {
      from();
    }, 1.5 * 1000);
  }
  clear() {
    this.polyline.get().then((polyline) => {
      polyline.clear();
    });
    this.label.get().then((label) => {
      label.clear();
    });
  }

  select(id: string) {
    this.polyline.get().then((polyline) => {
      polyline.select(id);
    });
  }
  blur() {
    this.polyline.get().then((polyline) => {
      polyline.blur();
    });
  }
  focus() {
    Promise.all([this.map.get(), this.polyline.get()]).then(
      ([map, polyline]) => {
        // 同上：没有覆盖物可自适应时别动视野，也别 claim
        if (polyline.size == 0) return;
        let from = () => {
          map.setFitView();
        };
        this.claim(from);
        from();
      }
    );
  }
  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
