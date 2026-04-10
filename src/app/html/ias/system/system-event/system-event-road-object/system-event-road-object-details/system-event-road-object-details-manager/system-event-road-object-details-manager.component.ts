import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../../common/components/container-page/container-page.component';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  Paged,
  PagedList,
} from '../../../../../../../common/data-core/models/interface/page-list.model';
import { IASMapComponent } from '../../../../../share/map/ias-map.component';

import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { EventResourceContent } from '../../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IMapMarkerPath } from '../../../../../../../common/tools/path-tool/path-map/marker/map-marker.interface';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapConfig } from '../../../../../share/map/controller/amap/ias-map-amap.config';
import { MapMarker } from '../../../../../share/map/ias-map.model';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { PicturePolygonMultipleComponent } from '../../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRoadObjectDetailsInfoComponent } from '../system-event-road-object-details-info/system-event-road-object-details-info.component';
import { SystemEventRoadObjectDetailsManagerBusiness } from './system-event-road-object-details-manager.business';

@Component({
  selector: 'ias-system-event-road-object-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    ContainerPageComponent,
    ContainerZoomComponent,
    PicturePolygonMultipleComponent,
    PictureComponent,
    IASMapComponent,
    SystemEventRoadObjectDetailsInfoComponent,
  ],
  templateUrl: './system-event-road-object-details-manager.component.html',
  styleUrl: './system-event-road-object-details-manager.component.less',
  providers: [SystemEventRoadObjectDetailsManagerBusiness],
})
export class SystemEventRoadObjectDetailsManagerComponent implements OnInit {
  @Input() data?: RoadObjectEventRecord;

  @Output() video = new EventEmitter<RoadObjectEventRecord>();
  @Output() picture = new EventEmitter<
    PagedList<EventResourceContent | RoadObject>
  >();

  constructor(private business: SystemEventRoadObjectDetailsManagerBusiness) {}

  Colors = IASMapAMapConfig.path.color;

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
      this.load.object(this.data);
    }
  }

  load = {
    picture: (data: RoadObjectEventRecord) => {
      if (data && data.Resources) {
        let page = Page.create(1, 1, data.Resources.length);
        this.record.picture.page.change(page);
      }
    },
    map: (data: RoadObjectEventRecord) => {
      this.map.marker.path = PathTool.image.map.object.get(
        data.RoadObjectType,
        { event: data.EventType }
      );
    },
    object: (data: RoadObjectEventRecord) => {
      this.business.get(data.RoadObjectId).then((x) => {
        this.road.object.data = x;
        this.road.object.picture.src = x.ImageUrl ?? '';
      });
    },
  };
  map = {
    marker: {
      path: PathTool.image.map.object.unknow.gray as IMapMarkerPath,
      size: SizeTool.map.shop.get(),
    },
    point: undefined as MapMarker | undefined,
  };
  record = {
    resource: undefined as EventResourceContent | undefined,
    picture: {
      src: '',
      reset: false,
      polygon: [] as HowellPoint[][],
      page: {
        data: Page.create(1),
        change: (page: Page) => {
          this.record.picture.page.data = page;
          if (
            this.data &&
            this.data.Resources &&
            this.data.Resources.length >= page.PageIndex
          ) {
            let index = page.PageIndex - 1;
            this.record.resource = this.data.Resources[index];
            if (this.record.resource.Location) {
              let gcj02 = this.record.resource.Location.GCJ02;
              this.map.point = {
                path:
                  gcj02.Course == undefined
                    ? PathTool.image.map.location.point
                    : PathTool.image.map.location.arrow,
                size: [56, 56],
                location: gcj02,
                offset: [-28, -28],
              };
            }
            this.record.picture.src = this.record.resource.ImageUrl ?? '';
            if (this.record.resource.Objects) {
              this.record.picture.polygon = this.record.resource.Objects.map(
                (x) => x.Polygon ?? []
              );
            }
          }
        },
      },
    },
  };
  road = {
    object: {
      data: undefined as RoadObject | undefined,
      picture: {
        src: '',
        reset: false,
      },
    },
  };

  on = {
    video: () => {
      if (this.data) {
        this.video.emit(this.data);
      }
    },
    picture: {
      record: () => {
        if (this.data && this.data.Resources) {
          let paged = PagedList.create(
            this.data.Resources,
            this.record.picture.page.data.PageIndex,
            1
          );
          paged.Data = [...this.data.Resources];
          this.picture.emit(paged);
        }
      },
      object: () => {
        if (this.road.object.data) {
          let paged = Paged.create([this.road.object.data], 1);
          this.picture.emit(paged);
        }
      },
    },
  };
}
