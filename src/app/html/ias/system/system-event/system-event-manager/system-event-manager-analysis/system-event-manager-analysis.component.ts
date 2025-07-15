import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemEventProcessDetailsComponent } from '../../system-event-process/system-event-process-details/system-event-process-details.component';
import { SystemEventTableArgs } from '../../system-event-table/business/system-event-table.model';
import { SystemEventTableAnalysisComponent } from '../../system-event-table/system-event-table-analysis/system-event-table-analysis.component';
import { SystemEventTaskComponent } from '../../system-event-task/component/system-event-task.component';
import { SystemEventVideoComponent } from '../../system-event-video/system-event-video.component';
import { SystemEventManagerAnalysisController } from './controller/system-event-manager-analysis.controller';
import { SystemEventManagerAnalysisSource } from './system-event-manager-analysis.soiurce';
import { SystemEventManagerAnalysisWindow } from './system-event-manager-analysis.window';

@Component({
  selector: 'ias-system-event-manager-analysis',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventTableAnalysisComponent,
    SystemEventTaskComponent,
    SystemEventVideoComponent,
    WindowComponent,
    WindowConfirmComponent,
    PictureListComponent,
    SystemEventProcessDetailsComponent,
  ],
  templateUrl: './system-event-manager-analysis.component.html',
  styleUrl: './system-event-manager-analysis.component.less',
  providers: [
    SystemEventManagerAnalysisSource,

    SystemEventManagerAnalysisController,
    SystemEventManagerAnalysisWindow,
  ],
})
export class SystemEventManagerAnalysisComponent implements OnInit {
  constructor(
    public source: SystemEventManagerAnalysisSource,
    private language: LanguageTool,
    private toastr: ToastrService,
    public controller: SystemEventManagerAnalysisController,
    public window: SystemEventManagerAnalysisWindow
  ) {}

  Language = Language;

  ngOnInit(): void {
    this.init.table();
  }

  private init = {
    table: () => {
      this.table.args.types = this.source.type.map((x) => x.Value);
    },
  };

  private regist = {
    process: {},
  };

  table = {
    args: new SystemEventTableArgs(),
    load: new EventEmitter<SystemEventTableArgs>(),
    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    on: {
      video: async (data: MobileEventRecord) => {
        let name = await this.language.event.EventType(data.EventType);
        this.window.video.title = `${name}`;
        if (data.Resources && data.Resources.length > 0) {
          let resource = data.Resources[0];
          this.window.video.title = `${resource.ResourceName} ${name}`;
        }
        this.window.video.data = data;
        this.window.video.show = true;
      },
      details: (data: MobileEventRecord) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
      picture: (data: MobileEventRecord) => {
        let datas = data.Resources?.filter((x) => x.ImageUrl) ?? [];
        let page = new Page();
        page.PageCount = datas.length;
        page.TotalRecordCount = datas.length;
        page.PageIndex = 1;
        page.PageSize = 1;
        page.RecordCount = 1;

        let paged = new PagedList<EventResourceContent>();
        paged.Page = page;
        paged.Data = datas;
        this.picture.open(paged, this.window.picture.show);
      },
      process: (data: MobileEventRecord) => {},
      task: (data: MobileEventRecord) => {
        this.window.task.data = data;
        this.window.task.show = true;
      },
    },
  };

  picture = {
    datas: [] as Array<
      MobileEventRecord | EventResourceContent | ShopRegistration | ShopSign
    >,
    open: (
      paged: PagedList<
        MobileEventRecord | EventResourceContent | ShopRegistration | ShopSign
      >,
      opened: boolean = false
    ) => {
      if (paged.Data.length == 0) return;

      this.picture.datas = paged.Data;

      this.window.picture.page = paged.Page;
      let index = paged.Page.PageIndex - 1;
      let data = paged.Data[index];
      this.window.picture.set(data);
      if (!opened) {
        this.window.picture.show = true;
      }
    },
    change: (page: Page) => {
      this.window.picture.page = page;
      let index = page.PageIndex - 1;
      let data = this.picture.datas[index];
      this.window.picture.set(data);
    },
  };

  confirm = {
    ok: () => {
      this.window.confirm.result = true;
      this.window.confirm.show = false;
    },
    close: () => {
      this.window.confirm.result = false;
      this.window.confirm.show = false;
    },
  };
}
