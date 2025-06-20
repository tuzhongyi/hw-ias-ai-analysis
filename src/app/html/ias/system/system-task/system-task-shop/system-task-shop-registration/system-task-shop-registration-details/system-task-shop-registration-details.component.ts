import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { IASMapComponent } from '../../../../../share/map/ias-map.component';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../../../../share/map/ias-map.model';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
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
  @Input() data?: ShopRegistration;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }
  private change = {
    data: (data: SimpleChange) => {
      if (data) {
        if (this.data) {
          this.map.location = this.data.Location;
          let marker = Object.assign({}, this.map.marker);
          marker.color = !this.data.AssociatedCount
            ? MapMarkerShopColor.orange
            : MapMarkerShopColor.blue;
          this.map.marker = marker;
          this.picture.src = this.data.ImageUrl ?? '';
        }
      }
    },
  };
  picture = {
    src: '',
  };
  map = {
    marker: {
      type: MapMarkerType.shop,
      color: MapMarkerShopColor.green,
    },
    location: undefined as GisPoint | undefined,
  };
}
