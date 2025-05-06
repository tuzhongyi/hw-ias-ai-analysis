import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { EventRecord } from '../../../../../../common/data-core/models/arm/event/event-record.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
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
    let paged = new PagedList<SystemEventTableItem>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x) => this.convert(x));
    return paged;
  }

  convert(source: EventRecord) {
    let plain = instanceToPlain(source);
    let data = plainToInstance(SystemEventTableItem, plain);
    data.EventTypeName = this.language.event.EventType(data.EventType, '');
    return data;
  }
}
