import { Injectable } from '@angular/core';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { ArmDivisionRequestService } from '../../../../../common/data-core/requests/services/division/division.service';
import { ArmSystemRequestService } from '../../../../../common/data-core/requests/services/system/system.service';
import { AMapCityLocator } from '../../../../../common/helper/map/amap.helper';

/** 地图兜底的落点 */
export interface IASMapCityFallback {
  division: Division;
  /** 名称定位不够用时才回头取的东西（惰性，真要用到才发请求） */
  locator: AMapCityLocator;
}

/**
 * 地图兜底：没有数据给地图定视野时，落回账号自己的位置。
 *
 * - 省 / 市：区划名称本身够唯一，交给 AMap setCity
 * - 县 / 街道：按名称查高德行政区划，用区划 Id 前缀认领同名项；
 *   一个都对不上才用账号下移动设备的当前位置
 * - 网格：AMap 里没有这一级，借上一级区划（县 / 街道）走县那套定位，
 *   上一级取不到再说设备位置
 */
@Injectable({
  providedIn: 'root',
})
export class IASMapCityBusiness {
  constructor(
    private division: ArmDivisionRequestService,
    private system: ArmSystemRequestService,
  ) {}

  async fallback(): Promise<IASMapCityFallback> {
    let division = await this.division.root();
    switch (division.DivisionType) {
      case ArmDivisionType.County:
        return {
          division,
          locator: { position: () => this.system.mobile.device.position() },
        };
      case ArmDivisionType.GridCell:
        return {
          division,
          locator: {
            parent: () => this.parent(division),
            position: () => this.system.mobile.device.position(),
          },
        };
      default:
        return { division, locator: {} };
    }
  }

  /** 上一级区划：缓存里有就直接拿，没有就按 Id 取一次 */
  private async parent(division: Division): Promise<Division | undefined> {
    if (!division.ParentId) return undefined;
    return this.division.cache.get(division.ParentId).catch(() => undefined);
  }
}
