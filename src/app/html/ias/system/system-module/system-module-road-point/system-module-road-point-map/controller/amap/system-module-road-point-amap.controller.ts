import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { LastResortTool } from '../../../../../../../../common/tools/last-resort-tool/last-resort.tool';
import { wait } from '../../../../../../../../common/tools/wait';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemModuleRoadPointAMapCircleLayerController } from './circle/system-module-road-point-amap-circle-layer.controller';
import { SystemModuleRoadPointAMapScatterLayerController } from './scatter/system-module-road-point-amap-scatter-layer.controller';

/** 地图容器 id —— 模板里那个 div 的 id 必须和它一致 */
const CONTAINER = 'system-module-road-point-map';

/**
 * 建图时的默认中心（上海市中心人民广场）。
 * `MapHelper.amap.get` 从不传 center，AMap 的缺省视野是 [0,0] —— 那儿是海，
 * 一张瓦片都没有，看着就跟地图没加载出来一样。给个真坐标先让瓦片有得画，
 * 后面的路网定位 / 城市兜底照旧会把它摆走
 */
const CENTER: [number, number] = [121.473701, 31.230416];

export class SystemModuleRoadPointAMapController {
  map = new PromiseValue<AMap.Map>();
  circle = new PromiseValue<SystemModuleRoadPointAMapCircleLayerController>();
  scatter = new PromiseValue<SystemModuleRoadPointAMapScatterLayerController>();
  road = new PromiseValue<IASMapAMapRoadController>();

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

  constructor(private subscription: Subscription) {
    // 等容器量出尺寸再建图：AMap 是按建图那一刻的容器尺寸定画布的，
    // 量出来是 0×0 的话画布就一直是空的（resizeEnable 只跟窗口尺寸走，补不回来）。
    // 万一容器一直没尺寸（布局真有问题），到点也照建，别把地图卡死
    wait(
      () => {
        let el = document.getElementById(CONTAINER);
        return !!el && el.offsetWidth > 0 && el.offsetHeight > 0;
      },
      { timeout: 5 * 1000, timeoutable: true }
    )
      .catch(() => {
        console.warn('[road-point-map] 容器一直没有尺寸，先按现状建图');
      })
      .then(() => {
        return MapHelper.amap.get(
          CONTAINER,
          ['AMap.CircleEditor', 'AMap.Adaptor'],
          true,
          { center: CENTER }
        );
      })
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        x.setZoom(17);

        let container = this.init.map(x);
        this.init.road(x, container);
        this.init.circle(x);
        this.init.scatter(container);
      });
  }

  private init = {
    map: (map: AMap.Map) => {
      this.map.set(map);
      let container = new Loca.Container({ map: map });
      return container;
    },
    road: (map: AMap.Map, loca: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, loca);
      this.road.set(ctr);
    },
    circle: (map: AMap.Map) => {
      let ctr = new SystemModuleRoadPointAMapCircleLayerController(map);
      this.circle.set(ctr);
    },
    scatter: (loca: Loca.Container) => {
      let ctr = new SystemModuleRoadPointAMapScatterLayerController(loca);
      this.scatter.set(ctr);
    },
  };

  city(value: string) {
    this.last.fallback(() => {
      this.map.get().then((x) => {
        // 等地图的这些时间里，可能已经有别的数据接管了视野
        if (this.last.claimed) {
          return;
        }
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
}
