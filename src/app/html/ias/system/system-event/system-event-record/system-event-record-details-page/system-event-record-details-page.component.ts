import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRecordDetailsComponent } from '../system-event-record-details/system-event-record-details.component';

@Component({
  selector: 'ias-system-event-record-details-page',
  imports: [
    CommonModule,
    PicturePolygonMultipleComponent,
    SystemEventRecordDetailsComponent,
  ],
  templateUrl: './system-event-record-details-page.component.html',
  styleUrl: './system-event-record-details-page.component.less',
})
export class SystemEventRecordDetailsPageComponent implements OnChanges {
  @Input() data?: MobileEventRecord;
  @Input('page') _page?: Page;
  @Output() get = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.data) {
          if (this.data.Resources && this.data.Resources.length > 0) {
            let resource = this.data.Resources[0];
            this.picture.id = resource.ImageUrl ?? '';
            this.picture.polygon =
              resource.Objects?.map((x) => x.Polygon) ?? [];
          }
        }
      }
    },
  };

  picture = {
    id: '',
    polygon: [] as HowellPoint[][],
  };
  page = {
    next: () => {
      if (this._page && this._page.PageIndex < this._page.PageCount) {
        this.get.emit(++this._page.PageIndex);
      }
    },
    prev: () => {
      if (this._page && this._page.PageIndex > 1) {
        this.get.emit(--this._page.PageIndex);
      }
    },
  };
}
