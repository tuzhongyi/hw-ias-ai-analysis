import { CommonModule } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../../../../../../../../common/components/paginator/paginator.component';
import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { IConverter } from '../../../../../../../../../common/data-core/models/converter.interface';
import { SystemEventMapPanelRecordTableBusiness } from '../system-event-map-panel-record-table.business';
import { SystemEventMapPanelRecordTableComponent } from '../system-event-map-panel-record-table.component';
import { MobileEventRecordModel } from '../system-event-map-panel-record-table.model';
import { SystemEventMapPanelRecordTableShopConverter } from './system-event-map-panel-record-table-shop.converter';

@Component({
  selector: 'ias-system-event-map-panel-record-table-shop',
  imports: [CommonModule, FormsModule, PaginatorComponent],
  templateUrl: './system-event-map-panel-record-table-shop.component.html',
  styleUrl: './system-event-map-panel-record-table-shop.component.less',
  providers: [
    SystemEventMapPanelRecordTableBusiness,
    SystemEventMapPanelRecordTableShopConverter,
  ],
})
export class SystemEventMapPanelRecordTableShopComponent
  extends SystemEventMapPanelRecordTableComponent
  implements OnChanges
{
  constructor(
    business: SystemEventMapPanelRecordTableBusiness,
    converter: SystemEventMapPanelRecordTableShopConverter
  ) {
    super(business);
    this.converter = converter;
  }

  override converter: IConverter<MobileEventRecord, MobileEventRecordModel>;
}
