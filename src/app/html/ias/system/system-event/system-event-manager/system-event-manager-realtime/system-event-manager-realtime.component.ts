import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  Paged,
  PagedList,
} from '../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemEventMapManagerComponent } from '../../system-event-map/system-event-map-manager/system-event-map-manager.component';
import { SystemEventProcessDetailsComponent } from '../../system-event-process/system-event-process-details/system-event-process-details.component';
import { SystemEventProcessRealtimeComponent } from '../../system-event-process/system-event-process-realtime/system-event-process-realtime.component';
import { SystemEventTableArgs } from '../../system-event-table/business/system-event-table.model';
import { SystemEventTableRealtimeComponent } from '../../system-event-table/system-event-table-realtime/system-event-table-realtime.component';
import { SystemEventTaskComponent } from '../../system-event-task/component/system-event-task.component';
import { SystemEventVideoComponent } from '../../system-event-video/system-event-video.component';
import { SystemEventManagerRealtimeController } from './controller/system-event-manager-realtime.controller';
import { SystemEventManagerRealtimeSource } from './system-event-manager-realtime.soiurce';
import { SystemEventManagerRealtimeWindow } from './system-event-manager-realtime.window';

@Component({
  selector: 'ias-system-event-manager-realtime',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventTableRealtimeComponent,
    SystemEventTaskComponent,
    SystemEventVideoComponent,
    WindowComponent,
    WindowConfirmComponent,
    HowellSelectComponent,
    PictureListComponent,
    SystemEventProcessDetailsComponent,
    SystemEventProcessRealtimeComponent,
    SystemEventMapManagerComponent,
  ],
  templateUrl: './system-event-manager-realtime.component.html',
  styleUrl: './system-event-manager-realtime.component.less',
  providers: [
    SystemEventManagerRealtimeSource,

    SystemEventManagerRealtimeController,
    SystemEventManagerRealtimeWindow,
  ],
})
export class SystemEventManagerRealtimeComponent implements OnInit, OnChanges {
  @Input() args?: SystemEventTableArgs;
  @Input() mapable = true;
  @Input() iswindow = false;

  constructor(
    public source: SystemEventManagerRealtimeSource,
    private language: LanguageTool,
    private toastr: ToastrService,
    public controller: SystemEventManagerRealtimeController,
    public window: SystemEventManagerRealtimeWindow
  ) {}

  Language = Language;

  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        this.table.args = {
          ...this.table.args,
          ...this.args,
        };
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  ngOnInit(): void {
    this.init.table();
    this.init.window();
  }

  private init = {
    table: async () => {
      this.table.args.types = (await this.source.type).map((x) => x.Value);
    },
    window: async () => {
      this.window.map.args.types = (await this.source.type).map((x) => x.Value);
    },
  };

  private regist = {
    process: {},
  };

  table = {
    args: new SystemEventTableArgs(),
    load: new EventEmitter<SystemEventTableArgs>(),
    selected: {
      channels: [] as EnumNameValue<number>[],
    },
    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    on: {
      video: async (data: MobileEventRecord) => {
        let name = await this.language.event.EventType(data.EventType);
        this.window.video.title = `${name}`;
        this.table.selected.channels =
          data.Resources?.map((x) => {
            let channel = new EnumNameValue<number>();
            channel.Name = x.ResourceName;
            channel.Value = x.PositionNo ?? 0;
            return channel;
          }) ?? [];
        if (data.Resources && data.Resources.length > 0) {
          let resource = data.Resources[0];
          this.window.video.title = `${resource.ResourceName} ${name}`;
          // this.window.video.args.channel = resource.PositionNo;
        }
        this.window.video.data = data;
        this.window.video.show = true;
      },
      details: (data: MobileEventRecord) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
      picture: (data: Paged<MobileEventRecord>) => {
        let datas = data.Data.Resources?.filter((x) => x.ImageUrl) ?? [];
        let page = new Page();
        page.PageCount = datas.length;
        page.TotalRecordCount = datas.length;
        page.PageIndex = data.Page.PageIndex;
        page.PageSize = 1;
        page.RecordCount = 1;

        let paged = new PagedList<EventResourceContent>();
        paged.Page = page;
        paged.Data = datas;
        this.picture.open(paged, this.window.picture.show);
      },
      process: (data: MobileEventRecord) => {
        this.window.process.data = data;
        this.window.process.show = true;
      },
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
