import { Injectable } from '@angular/core';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadSectionsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-section/geographic-road-section.params';
import {
  SystemModuleRoadSectionTableArgs,
  SystemModuleRoadSectionTableItem,
} from './system-module-road-section-table.model';
import { SystemModuleRoadSectionTableSource } from './system-module-road-section-table.source';

@Injectable()
export class SystemModuleRoadSectionTableBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private source: SystemModuleRoadSectionTableSource
  ) {}

  async load(args: SystemModuleRoadSectionTableArgs) {
    let datas = await this.data(args);
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  convert(source: RoadSection) {
    let item = new SystemModuleRoadSectionTableItem();
    item = Object.assign(item, source);
    if (item.EventTypes) {
      item.EventTypeNames = item.EventTypes.map((x) => {
        return this.source.type.event.get(x)!;
      }).join('，');
    }
    return item;
  }

  private data(args: SystemModuleRoadSectionTableArgs) {
    let params = new GetRoadSectionsParams();
    params.Name = args.name;
    if (args.type != undefined) {
      params.SectionTypes = [args.type];
    }

    return this.service.road.section.all(params);
  }
}
