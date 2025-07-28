import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContainerZoomComponent } from '../../../../../common/components/container-zoom/container-zoom.component';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GeoTool } from '../../../../../common/tools/geo-tool/geo.tool';
import { Language } from '../../../../../common/tools/language-tool/language';
import { PictureComponent } from '../../../share/picture/component/picture.component';

@Component({
  selector: 'ias-system-map-panel-details-shop-registration',
  imports: [CommonModule, PictureComponent, ContainerZoomComponent],
  templateUrl: './system-map-panel-details-shop-registration.component.html',
  styleUrl: './system-map-panel-details-shop-registration.component.less',
})
export class SystemMapPanelDetailsShopRegistrationComponent {
  @Input('data') data?: ShopRegistration;
  @Output() close = new EventEmitter<void>();
  @Output() picture = new EventEmitter<ShopRegistration>();
  @Input() locationable = false;
  @Input() picturefullable = true;

  constructor() {}

  Language = Language;

  get location() {
    if (this.data) {
      if (this.data.Location) {
        let longitude =
          this.data.Location.Longitude - GeoTool.point.offset.longitude;
        let latitude =
          this.data.Location.Latitude - GeoTool.point.offset.latitude;
        let wgs84 = GeoTool.point.convert.gcj02.to.wgs84(longitude, latitude);
        return wgs84.join(',');
      }
    }
    return undefined;
  }

  onclose() {
    this.close.emit();
  }

  onpicture() {
    if (this.data) {
      this.picture.emit(this.data);
    }
  }
}
