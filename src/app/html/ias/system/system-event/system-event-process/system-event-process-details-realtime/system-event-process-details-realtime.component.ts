import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../common/components/container-page/container-page.component';
import { Assignment } from '../../../../../../common/data-core/models/arm/event/assignment.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/interface/page-list.model';
import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { IASMapComponent } from '../../../../share/map/ias-map.component';
import { MapMarkerStyle } from '../../../../share/map/ias-map.model';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';

@Component({
  selector: 'ias-system-event-process-details-realtime',
  imports: [
    CommonModule,
    FormsModule,
    ContainerPageComponent,
    PicturePolygonMultipleComponent,

    SystemEventRecordDetailsComponent,
    IASMapComponent,
  ],
  templateUrl: './system-event-process-details-realtime.component.html',
  styleUrl: './system-event-process-details-realtime.component.less',
})
export class SystemEventProcessDetailsRealtimeComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Output() picture = new EventEmitter<
    PagedList<EventResourceContent | Assignment>
  >();
  @Output() video = new EventEmitter<MobileEventRecord>();

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
      this.disabled.load(this.data);
    }
  }

  load = {
    picture: (data?: MobileEventRecord) => {
      if (data) {
        if (data.Resources) {
          let page = Page.create(1, 1, data.Resources.length);
          this.record.picture.page.change(page);
        }
        if (data.Assignment?.HandledImageUrls) {
          let page = Page.create(1, 1, data.Assignment.HandledImageUrls.length);
          this.handle.picture.page.change(page);
        }
      }
    },
    map: (data: MobileEventRecord) => {
      switch (data.EventType) {
        case 8:
          this.map.marker.path = PathTool.image.map.shop.blue;
          this.map.marker.size = SizeTool.map.shop.get();
          break;
        case 9:
          this.map.marker.path = PathTool.image.map.shop.green;
          this.map.marker.size = SizeTool.map.shop.get();
          break;

        default:
          break;
      }
    },
  };
  map = {
    marker: new MapMarkerStyle(),
    point: undefined as GisPoint | undefined,
  };
  record = {
    picture: {
      src: '',
      reset: false,
      polygon: [] as HowellPoint[][],
      page: {
        data: Page.create(1),
        change: (page: Page) => {
          this.record.picture.page.data = page;
          let resources =
            this.data?.Resources?.filter((x) => !!x.ImageUrl) ?? [];
          if (resources && resources.length >= page.PageIndex) {
            let index = page.PageIndex - 1;
            let resource = resources[index];
            this.record.picture.src = resource.ImageUrl ?? '';
            if (resource.Objects) {
              this.record.picture.polygon = resource.Objects.map(
                (x) => x.Polygon ?? []
              );
            }
          }
        },
      },
      open: () => {
        if (this.data && this.data.Resources) {
          let resources = this.data.Resources.filter((x) => !!x.ImageUrl);
          let paged = PagedList.create(
            resources,
            this.record.picture.page.data.PageIndex,
            resources.length
          );
          this.picture.emit(paged);
        }
      },
    },
  };
  handle = {
    picture: {
      src: '',
      reset: false,
      polygon: [] as HowellPoint[][],
      page: {
        data: Page.create(1),
        change: (page: Page) => {
          this.handle.picture.page.data = page;
          if (
            this.data &&
            this.data.Assignment &&
            this.data.Assignment.HandledImageUrls &&
            this.data.Assignment.HandledImageUrls.length >= page.PageIndex
          ) {
            let index = page.PageIndex - 1;
            let image = this.data.Assignment.HandledImageUrls[index];
            this.handle.picture.src = image;
          }
        },
      },
      open: () => {
        if (this.data && this.data.Assignment) {
          let paged = PagedList.create(
            [this.data.Assignment],
            this.handle.picture.page.data.PageIndex,
            this.data.Assignment.HandledImageUrls?.length ?? 0
          );
          this.picture.emit(paged);
        }
      },
    },
  };

  disabled = {
    load: (data: MobileEventRecord) => {
      let task =
        data.Resources && data.Resources.findIndex((x) => !!x.ImageUrl) >= 0;
      this.disabled.task.full = !task;
      this.disabled.task.reset = !task;

      let result =
        data.Assignment &&
        data.Assignment.HandledImageUrls &&
        data.Assignment.HandledImageUrls.length > 0;

      this.disabled.result.full = !result;
      this.disabled.result.reset = !result;

      let resource =
        data.Resources && data.Resources.findIndex((x) => !x.RecordUrl) >= 0;
      this.disabled.result.video = !!resource;
    },
    task: {
      full: false,
      reset: false,
    },
    result: {
      full: false,
      reset: false,
      video: false,
    },
  };

  on = {
    video: () => {
      if (this.data) {
        this.video.emit(this.data);
      }
    },
  };
}
