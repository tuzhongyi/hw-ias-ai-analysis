import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerPageComponent } from '../../../../../../common/components/container-page/container-page.component';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { AudioButtonComponent } from '../../../../share/audio/audio-button/audio-button.component';
import { IASMapComponent } from '../../../../share/map/ias-map.component';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';

@Component({
  selector: 'ias-system-event-process-realtime',
  imports: [
    CommonModule,
    ContainerPageComponent,
    PicturePolygonMultipleComponent,
    IASMapComponent,
    SystemEventRecordDetailsComponent,
    AudioButtonComponent,
  ],
  templateUrl: './system-event-process-realtime.component.html',
  styleUrl: './system-event-process-realtime.component.less',
})
export class SystemEventProcessRealtimeComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.data) {
      this.picture.load(this.data);
      this.map.load(this.data);
    }
  }

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
  };
  map = {
    load: (data: MobileEventRecord) => {
      this.map.location = data.Location?.GCJ02;
      this.map.points = data.Location ? [data.Location.GCJ02] : [];
    },
    location: undefined as GisPoint | undefined,
    points: [] as GisPoint[],
  };

  on = {
    close: () => {
      this.close.emit();
    },
    ok: () => {},
  };
}
