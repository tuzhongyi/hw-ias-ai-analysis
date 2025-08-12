import { Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { PagedList } from '../../../../../../../../common/data-core/models/page-list.model';

@Injectable()
export class SystemEventMapPanelRecordTableBusiness {
  async load(index: number, size: number, datas: MobileEventRecord[]) {
    let paged = PagedList.create<MobileEventRecord>(datas, index, size);

    return paged;
  }
}
