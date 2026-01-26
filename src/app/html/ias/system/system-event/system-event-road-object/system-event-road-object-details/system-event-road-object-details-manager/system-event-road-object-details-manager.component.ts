import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../../common/components/container-page/container-page.component';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  PagedList,
} from '../../../../../../../common/data-core/models/page-list.model';
import { IASMapComponent } from '../../../../../share/map/ias-map.component';
import {
  MapMarkerColor,
  MapMarkerType,
} from '../../../../../share/map/ias-map.model';
import { PicturePolygonMultipleComponent } from '../../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRoadObjectDetailsInfoComponent } from '../system-event-road-object-details-info/system-event-road-object-details-info.component';

@Component({
  selector: 'ias-system-event-road-object-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    ContainerPageComponent,
    PicturePolygonMultipleComponent,
    IASMapComponent,
    SystemEventRoadObjectDetailsInfoComponent,
  ],
  templateUrl: './system-event-road-object-details-manager.component.html',
  styleUrl: './system-event-road-object-details-manager.component.less',
})
export class SystemEventRoadObjectDetailsManagerComponent implements OnInit {
  @Input() data?: RoadObjectEventRecord;
  @Output() picture = new EventEmitter<PagedList<RoadObjectEventRecord>>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
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
      switch (data.RoadObjectType) {
        case RoadObjectType.BusStation:
          this.map.marker.color = MapMarkerColor.blue;
          break;
        case RoadObjectType.FireHydrant:
          this.map.marker.color = MapMarkerColor.red;
          break;
        case RoadObjectType.Passage:
          this.map.marker.color = MapMarkerColor.orange;
          break;
        case RoadObjectType.TrashCan:
          this.map.marker.color = MapMarkerColor.green;
          break;

        default:
          break;
      }
    },
  };
  map = {
    marker: {
      type: MapMarkerType.roadobject,
      color: undefined as MapMarkerColor | undefined,
    },
    point: undefined as GisPoint | undefined,
  };
  record = {
    picture: {
      src: '',
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
            let resource = this.data.Resources[index];
            this.record.picture.src = resource.ImageUrl ?? '';
            if (resource.Objects) {
              this.record.picture.polygon = resource.Objects.map(
                (x) => x.Polygon ?? []
              );
            }
          }
        },
      },
    },
  };
}
