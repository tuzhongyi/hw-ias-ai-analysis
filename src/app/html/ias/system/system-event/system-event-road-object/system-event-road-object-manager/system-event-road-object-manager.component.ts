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
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
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
import { SystemEventVideoComponent } from '../../system-event-video/system-event-video.component';
import { SystemEventRoadObjectDetailsManagerComponent } from '../system-event-road-object-details/system-event-road-object-details-manager/system-event-road-object-details-manager.component';
import { SystemEventRoadObjectTableComponent } from '../system-event-road-object-table/system-event-road-object-table.component';
import { SystemEventRoadObjectTableArgs } from '../system-event-road-object-table/system-event-road-object-table.model';
import { SystemEventRoadObjectManagerSource } from './system-event-road-object-manager.source';
import { SystemEventManagerRealtimeWindow } from './system-event-road-object-manager.window';

@Component({
  selector: 'ias-system-event-road-object-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SystemEventRoadObjectTableComponent,
    SystemEventVideoComponent,
    PictureListComponent,
    WindowComponent,
    WindowConfirmComponent,

    SystemEventRoadObjectDetailsManagerComponent,
  ],
  templateUrl: './system-event-road-object-manager.component.html',
  styleUrl: './system-event-road-object-manager.component.less',
  providers: [
    SystemEventRoadObjectManagerSource,
    SystemEventManagerRealtimeWindow,
  ],
})
export class SystemEventRoadObjectManagerComponent
  implements OnInit, OnChanges
{
  @Input() args?: SystemEventRoadObjectTableArgs;
  @Input() mapable = true;
  @Input() iswindow = false;

  constructor(
    public source: SystemEventRoadObjectManagerSource,
    private toastr: ToastrService,
    private language: LanguageTool,
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

  ngOnInit(): void {}

  table = {
    args: new SystemEventRoadObjectTableArgs(),
    load: new EventEmitter<SystemEventRoadObjectTableArgs>(),
    selected: {
      channels: [] as EnumNameValue<number>[],
    },
    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    on: {
      video: async (data: RoadObjectEventRecord) => {
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
      details: (data: RoadObjectEventRecord) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
      picture: (data: Paged<RoadObjectEventRecord>) => {
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
      process: (data: RoadObjectEventRecord) => {
        this.window.process.data = data;
        this.window.process.show = true;
      },
      task: (data: RoadObjectEventRecord) => {
        this.window.task.data = data;
        this.window.task.show = true;
      },
    },
  };

  picture = {
    datas: [] as Array<RoadObjectEventRecord | EventResourceContent>,
    open: (
      paged: PagedList<RoadObjectEventRecord | EventResourceContent>,
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
