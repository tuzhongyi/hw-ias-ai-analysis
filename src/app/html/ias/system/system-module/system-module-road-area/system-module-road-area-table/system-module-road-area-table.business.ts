import { Injectable } from '@angular/core';
import { RoadArea } from '../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadAreasParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-area/geographic-road-area.params';
import {
  SystemModuleRoadAreaTableArgs,
  SystemModuleRoadAreaTableItem,
} from './system-module-road-area-table.model';
import { SystemModuleRoadAreaTableSource } from './system-module-road-area-table.source';

@Injectable()
export class SystemModuleRoadAreaTableBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private source: SystemModuleRoadAreaTableSource,
  ) {}

  async load(args: SystemModuleRoadAreaTableArgs) {
    let datas = await this.data(args);
    // 列表接口的 Area 是可选字段（协议 3.1.129 标 O），经常不带几何。
    // 地图要画区域、编辑窗口也要用这份坐标，缺的行补一次详情
    await this.fill(datas);
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  /** 补齐列表里缺失的区域坐标。详情接口返回的是完整 RoadArea，一定带 Area */
  private async fill(datas: RoadArea[]) {
    let missing = datas.filter((x) => !x.Area || x.Area.length == 0);
    if (missing.length == 0) {
      return;
    }
    await Promise.all(
      missing.map(async (x) => {
        try {
          let detail = await this.service.road.area.get(x.Id);
          x.Area = detail.Area;
        } catch (error) {
          // 补不到就当没有几何：地图会退回按路网定位
        }
      }),
    );
  }

  convert(source: RoadArea) {
    let item = new SystemModuleRoadAreaTableItem();
    item = Object.assign(item, source);
    if (item.EventTypes) {
      item.EventTypeNames = item.EventTypes.map((x) => {
        return this.source.type.event.get(x)!;
      }).join('，');
    }
    return item;
  }

  private data(args: SystemModuleRoadAreaTableArgs) {
    let params = new GetRoadAreasParams();
    params.Name = args.name;
    if (args.type != undefined) {
      // 协议里这个字段是数组（UsageTypes），不是单个值
      params.UsageTypes = [args.type];
    }

    return this.service.road.area.all(params);
  }
}
