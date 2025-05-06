import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../common/components/date-time-control/date-time-control.component';
import { WindowComponent } from '../../../../../common/components/window-control/window.component';
import { EventRecord } from '../../../../../common/data-core/models/arm/event/event-record.model';
import {
  Page,
  Paged,
} from '../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../common/tools/language-tool/language.tool';
import { PictureWindowContentPageListComponent } from '../../../share/picture-window-content-page-list/picture-window-content-page-list.component';
import { VideoWindowContentComponent } from '../../../share/video/video-window-content/video-window-content.component';
import { SystemEventDetailsComponent } from '../system-event-details/component/system-event-details.component';
import { SystemEventMapComponent } from '../system-event-map/system-event-map.component';
import { SystemEventTableArgs } from '../system-event-table/business/system-event-table.model';
import { SystemEventTableComponent } from '../system-event-table/system-event-table.component';
import { SystemEventManagerSource } from './system-event-manager.soiurce';
import { SystemEventManagerWindow } from './system-event-manager.window';

@Component({
  selector: 'ias-system-event-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventTableComponent,
    SystemEventDetailsComponent,
    SystemEventMapComponent,
    PictureWindowContentPageListComponent,
    VideoWindowContentComponent,
    WindowComponent,
  ],
  templateUrl: './system-event-manager.component.html',
  styleUrl: './system-event-manager.component.less',
  providers: [SystemEventManagerSource],
})
export class SystemEventManagerComponent {
  constructor(
    public source: SystemEventManagerSource,
    private language: LanguageTool
  ) {}
  window = new SystemEventManagerWindow();

  Language = Language;

  table = {
    args: new SystemEventTableArgs(),
    load: new EventEmitter<SystemEventTableArgs>(),
    get: new EventEmitter<number>(),
    on: {
      position: async (data: EventRecord) => {
        this.window.map.title = `${await this.language.event.EventType(
          data.EventType
        )} ${formatDate(data.EventTime, Language.YearMonthDayHHmmss, 'en')}`;
        this.window.map.data = data.Location;
        this.window.map.show = true;
      },
      video: (data: EventRecord) => {
        if (data.Resources && data.Resources.length > 0) {
          this.window.video.filename = data.Resources[0].RecordUrl;
          this.window.video.show = true;
        }
      },
      details: (data: EventRecord) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
      picture: (data: Paged<Paged<EventRecord>>) => {
        this.picture.open(data, this.window.picture.show);
      },
    },
  };

  picture = {
    open: async (paged: Paged<Paged<EventRecord>>, opened = false) => {
      this.window.picture.page = paged.Page;
      if (!opened) {
        this.window.picture.index = paged.Data.Page.PageIndex;
      }

      this.window.picture.datas =
        paged.Data.Data.Resources?.map((x) => x.ImageUrl ?? '') ?? [];

      if (this.window.picture.index > this.window.picture.datas.length) {
        this.window.picture.index = this.window.picture.datas.length;
      }

      this.window.picture.title = `${await this.language.event.EventType(
        paged.Data.Data.EventType
      )} ${formatDate(
        paged.Data.Data.EventTime,
        Language.YearMonthDayHHmmss,
        'en'
      )}`;
      this.window.picture.show = true;
    },
    change: (page: Page) => {
      this.table.get.emit(page.PageIndex);
    },
  };
}
