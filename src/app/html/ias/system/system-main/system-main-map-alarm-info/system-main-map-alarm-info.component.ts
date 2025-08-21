import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerPageComponent } from '../../../../../common/components/container-page/container-page.component';
import { ContainerZoomComponent } from '../../../../../common/components/container-zoom/container-zoom.component';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import {
  Page,
  Paged,
} from '../../../../../common/data-core/models/page-list.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { AudioButtonComponent } from '../../../share/audio/audio-button/audio-button.component';
import { PictureComponent } from '../../../share/picture/component/picture.component';
import {
  SystemMainMapAlarmInfoInput,
  SystemMainMapAlarmInfoOutput,
} from './system-main-map-alarm-info.model';

@Component({
  selector: 'ias-system-main-map-alarm-info',
  imports: [
    CommonModule,
    ContainerPageComponent,
    ContainerZoomComponent,
    PictureComponent,
    AudioButtonComponent,
  ],
  templateUrl: './system-main-map-alarm-info.component.html',
  styleUrl: './system-main-map-alarm-info.component.less',
})
export class SystemMainMapAlarmInfoComponent
  implements OnInit, SystemMainMapAlarmInfoInput, SystemMainMapAlarmInfoOutput
{
  @Input() data?: MobileEventRecord;

  @Output() close = new EventEmitter<void>();
  @Output() video = new EventEmitter<MobileEventRecord>();
  @Output() image = new EventEmitter<Paged<MobileEventRecord>>();

  constructor() {}

  name: string = '';

  ngOnInit(): void {
    if (this.data) {
      this.init(this.data);
    }
  }

  private init(data: MobileEventRecord) {
    this.name = ObjectTool.model.MobileEventRecord.get.name(data);
    if (data.Resources && data.Resources.length > 0) {
      let resource = data.Resources[0];
      this.picture.id = resource.ImageUrl;
      this.picture.page.data = Page.create(1, 1, data.Resources.length);
    }
  }

  picture = {
    id: undefined as string | undefined,
    page: {
      data: Page.create(1, 1),
      change: (page: Page) => {
        this.picture.page.data = page;
        if (
          this.data &&
          this.data.Resources &&
          this.data.Resources.length > 0
        ) {
          let index = page.PageIndex - 1;
          let resource = this.data.Resources[index];
          this.picture.id = resource.ImageUrl;
        }
      },
    },
  };

  on = {
    close: () => {
      this.close.emit();
    },
    video: () => {
      if (this.data) {
        this.video.emit(this.data);
      }
    },
    image: () => {
      if (this.data) {
        let count = this.picture.page.data.TotalRecordCount;
        let paged = Paged.create(
          this.data,
          this.picture.page.data.PageIndex,
          count,
          count
        );
        this.image.emit(paged);
      }
    },
  };
}
