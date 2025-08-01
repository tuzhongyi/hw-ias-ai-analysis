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
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { NameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';
import { IASMapComponent } from '../../../../../share/map/ias-map.component';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../../../../share/map/ias-map.model';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { PicturePolygonArgs } from '../../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemTaskShopRegistrationInfoComponent } from '../system-task-shop-registration-info/system-task-shop-registration-info.component';

@Component({
  selector: 'ias-system-task-shop-registration-details',
  imports: [
    CommonModule,
    ContainerZoomComponent,
    PictureComponent,
    IASMapComponent,
    SystemTaskShopRegistrationInfoComponent,
  ],
  templateUrl: './system-task-shop-registration-details.component.html',
  styleUrl: './system-task-shop-registration-details.component.less',
})
export class SystemTaskShopRegistrationDetailsComponent implements OnChanges {
  @Input() data?: ShopRegistrationTaskDetectedResult;
  @Output('picture') output_picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }
  private change = {
    data: (data: SimpleChange) => {
      if (data) {
        if (this.data) {
          this.map.location = this.data.Location?.GCJ02;
          let marker = Object.assign({}, this.map.marker);
          marker.color = this.data.Detected
            ? MapMarkerShopColor.blue
            : MapMarkerShopColor.orange;
          this.map.marker = marker;
          this.picture.src = this.data.ImageUrl ?? '';
        }
      }
    },
  };
  picture = {
    src: '',
    full: () => {
      if (this.data) {
        let args = new PicturePolygonArgs();
        args.id = this.data.ImageUrl;
        let nv = new NameValue<PicturePolygonArgs>();
        nv.Name = this.data.Name;
        nv.Value = args;
        let paged = PagedList.create([nv], 1, 1);
        this.output_picture.emit(paged);
      }
    },
  };
  map = {
    marker: {
      type: MapMarkerType.shop,
      color: MapMarkerShopColor.green,
    },
    location: undefined as GisPoint | undefined,
  };
}
