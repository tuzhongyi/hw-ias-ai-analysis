import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../common/components/container-page/container-page.component';
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { NameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  Paged,
  PagedList,
} from '../../../../../../common/data-core/models/interface/page-list.model';
import { SystemEventHandleParams } from '../../../../../../common/data-core/requests/services/system/event/handle/system-event-handle.params';
import { EventBlockedParams } from '../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { AudioButtonComponent } from '../../../../share/audio/audio-button/audio-button.component';
import { AudioSubtitleComponent } from '../../../../share/audio/audio-subtitle/audio-subtitle.component';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';
import { SystemEventProcessBlockedComponent } from '../system-event-process-blocked/system-event-process-blocked.component';
import { SystemEventProcessHandlingComponent } from '../system-event-process-handling/system-event-process-handling.component';
import { SystemEventProcessMapComponent } from '../system-event-process-map/system-event-process-map.component';

@Component({
  selector: 'ias-system-event-process-realtime',
  imports: [
    CommonModule,
    FormsModule,
    ContainerPageComponent,
    PicturePolygonMultipleComponent,
    // IASMapComponent,
    SystemEventRecordDetailsComponent,
    AudioButtonComponent,
    AudioSubtitleComponent,
    SystemEventProcessBlockedComponent,
    SystemEventProcessHandlingComponent,
    SystemEventProcessMapComponent,
  ],
  templateUrl: './system-event-process-realtime.component.html',
  styleUrl: './system-event-process-realtime.component.less',
})
export class SystemEventProcessRealtimeComponent implements OnInit, OnChanges {
  @Input() blockable = true;
  @Input() data?: MobileEventRecord;
  @Output() close = new EventEmitter<void>();
  @Output('picture') _picture = new EventEmitter<Paged<MobileEventRecord>>();
  @Output('blocked') _blocked = new EventEmitter<{
    eventId: string;
    params: EventBlockedParams;
    autonext: boolean;
  }>();
  @Output('handle') _handle = new EventEmitter<{
    eventId: string;
    params: SystemEventHandleParams;
    autonext: boolean;
  }>();
  @Input() page = new Page();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() pictureupload = new EventEmitter<PagedList<NameValue>>();
  @Output() picturehandle = new EventEmitter<PagedList<NameValue>>();

  constructor() {
    this.init();
  }

  autonext = true;

  ngOnInit(): void {
    if (this.data) {
      this.load(this.data);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  private init() {
    this.blocked.params.TotalDays = 7;
    this.blocked.params.Raduis = 15;
  }
  private load(data: MobileEventRecord) {
    this.picture.load(data);
    this.map.load(data);
    // this.audio.show = !!data.AudioUrl;

    if (data.Assignment) {
      this.blocked.show = !data.Assignment.Handled;
      this.handle.show = !data.Assignment.Handled;
      this.audio.show = !data.Assignment.Handled;
    } else {
      this.blocked.show = true;
      this.handle.show = true;
      this.audio.show = true;
    }
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change && !change.firstChange) {
        if (this.data) {
          this.load(this.data);
        }
      }
    },
    page: (change: SimpleChange) => {
      if (change) {
        if (this.page.PageIndex < this.page.PageCount) {
        }
      }
    },
  };

  picture = {
    load: (data: MobileEventRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.picture.src = resource.ImageUrl ?? '';
        this.picture.polygon = resource.Objects?.map((p) => p.Polygon) ?? [];
        let page = Page.create(1, 1, data.Resources.length);
        this.picture.page.data = page;
      }
    },
    src: '',
    polygon: [] as HowellPoint[][],
    page: {
      data: new Page(),
      change: (page: Page) => {
        this.picture.page.data = page;
        if (
          this.data &&
          this.data.Resources &&
          this.data.Resources.length > 0
        ) {
          let resource = this.data.Resources[page.PageIndex - 1];
          this.picture.src = resource.ImageUrl ?? '';
          this.picture.polygon = resource.Objects?.map((p) => p.Polygon) ?? [];
        }
      },
    },
    full: () => {
      if (this.data) {
        let paged = new Paged<MobileEventRecord>();
        paged.Data = this.data;
        paged.Page = Object.assign(new Page(), this.picture.page.data);
        this._picture.emit(paged);
      }
    },
    preview: (paged: PagedList<NameValue>) => {
      this.pictureupload.emit(paged);
    },
  };
  map = {
    load: (data: MobileEventRecord) => {
      this.map.location = data.Location?.GCJ02;
    },
    location: undefined as GisPoint | undefined,
    points: [] as GisPoint[],
  };

  audio = {
    show: true,
    play: new EventEmitter<void>(),
    progress: 0,
    inited: () => {
      this.audio.play.emit();
    },
    playing: (progress: number) => {
      this.audio.progress = progress * 100;
    },
    stoped: () => {
      this.audio.progress = 0;
    },
  };

  on = {
    close: () => {
      this.close.emit();
    },
    handle: async (misinfo: boolean = false) => {
      if (this.data) {
        this.handle.params.IsMisInfo = misinfo;
        let args = {
          eventId: this.data.Id,
          params: this.handle.params,
          autonext: this.autonext,
        };
        if (this.handle.params.IsMisInfo) {
          this._handle.emit(args);
        } else {
          this.handle.picture.get.emit((files: UploadControlFile[]) => {
            args.params.Pictures = files.reduce(
              (pictures, file) => {
                pictures[file.filename] = file.data as ArrayBuffer;
                return pictures;
              },
              {} as Record<string, ArrayBuffer>,
            );
            this._handle.emit(args);
          });
        }
      }
    },
    misinfo: () => {
      this.on.handle(true);
    },
    blocked: () => {
      if (this.data) {
        let args = {
          eventId: this.data.Id,
          params: this.blocked.params,
          autonext: this.autonext,
        };
        this._blocked.emit(args);
      }
    },
    page: {
      prev: () => {
        this.prev.emit();
      },
      next: () => {
        this.next.emit();
      },
    },
  };

  blocked = {
    show: true,
    enabled: false,
    params: new EventBlockedParams(),
  };

  handle = {
    show: true,
    params: new SystemEventHandleParams(),
    picture: {
      get: new EventEmitter<(files: UploadControlFile[]) => void>(),

      preview: {
        upload: (paged: PagedList<NameValue>) => {
          this.pictureupload.emit(paged);
        },
        handle: (paged: PagedList<NameValue>) => {
          this.picturehandle.emit(paged);
        },
      },
    },
  };
}
