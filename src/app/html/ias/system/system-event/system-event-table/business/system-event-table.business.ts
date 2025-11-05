import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import {
  SystemEventTableFilter,
  SystemEventTableItem,
} from './system-event-table.model';
import { SystemEventTableService } from './system-event-table.service';

@Injectable()
export class SystemEventTableBusiness {
  constructor(
    public medium: MediumRequestService,
    private service: SystemEventTableService,
    private language: LanguageTool
  ) {}

  async load(index: number, size: number, filter: SystemEventTableFilter) {
    let datas = await this.service.load(index, size, filter);

    if (datas.Page.PageCount > 0 && datas.Page.PageCount < index) {
      datas = await this.service.load(datas.Page.PageCount, size, filter);
    }

    let paged = new PagedList<SystemEventTableItem>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x) => this.convert(x));

    return paged;
  }

  convert(source: MobileEventRecord) {
    let plain = instanceToPlain(source);
    let data = plainToInstance(SystemEventTableItem, plain);
    data.EventTypeName = this.language.event.EventType(data.EventType, '');
    data.EmergencyTypeName = this.language.event.EmergencyType(
      data.EmergencyType,
      ''
    );
    if (data.Resources) {
      data.Resources = data.Resources.sort((a, b) => {
        return LocaleCompare.compare(b.PositionNo, a.PositionNo);
      });
    }
    data.ResourceName =
      source.Resources?.map((x) => x.ResourceName).join('\n') ?? '';

    return data;
  }
}
