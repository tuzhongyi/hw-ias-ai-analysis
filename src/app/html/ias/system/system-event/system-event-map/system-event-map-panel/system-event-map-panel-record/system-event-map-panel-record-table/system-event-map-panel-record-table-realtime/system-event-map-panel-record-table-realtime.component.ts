import { CommonModule } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../../../../../../../../common/components/paginator/paginator.component';
import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { IConverter } from '../../../../../../../../../common/data-core/models/converter.interface';
import { AudioButtonComponent } from '../../../../../../../share/audio/audio-button/audio-button.component';
import { SystemEventMapPanelRecordTableBusiness } from '../system-event-map-panel-record-table.business';
import { SystemEventMapPanelRecordTableComponent } from '../system-event-map-panel-record-table.component';
import { MobileEventRecordModel } from '../system-event-map-panel-record-table.model';
import { SystemEventMapPanelRecordTableRealtimeConverter } from './system-event-map-panel-record-table-realtime.converter';

@Component({
  selector: 'ias-system-event-map-panel-record-table-realtime',
  imports: [
    CommonModule,
    FormsModule,
    PaginatorComponent,
    AudioButtonComponent,
  ],
  templateUrl: './system-event-map-panel-record-table-realtime.component.html',
  styleUrl: './system-event-map-panel-record-table-realtime.component.less',
  providers: [
    SystemEventMapPanelRecordTableBusiness,
    SystemEventMapPanelRecordTableRealtimeConverter,
  ],
})
export class SystemEventMapPanelRecordTableRealtimeComponent
  extends SystemEventMapPanelRecordTableComponent
  implements OnChanges
{
  constructor(
    business: SystemEventMapPanelRecordTableBusiness,
    converter: SystemEventMapPanelRecordTableRealtimeConverter
  ) {
    super(business);
    this.converter = converter;
  }

  override converter: IConverter<MobileEventRecord, MobileEventRecordModel>;
}
