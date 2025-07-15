import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContainerZoomComponent } from '../../../../../../../../common/components/container-zoom/container-zoom.component';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { NameValue } from '../../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../../../common/tools/language-tool/language';
import { PictureComponent } from '../../../../../../share/picture/component/picture.component';
import { PicturePolygonArgs } from '../../../../../../share/picture/picture-polygon/picture-polygon.model';

@Component({
  selector: 'ias-system-task-route-map-panel-details-shop-registration',
  imports: [CommonModule, PictureComponent, ContainerZoomComponent],
  templateUrl:
    './system-task-route-map-panel-details-shop-registration.component.html',
  styleUrl:
    './system-task-route-map-panel-details-shop-registration.component.less',
})
export class SystemTaskRouteMapPanelDetailsShopRegistrationComponent {
  @Input('data') data?: ShopRegistrationTaskDetectedResult;
  @Output() close = new EventEmitter<void>();
  @Output() picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();

  Language = Language;

  on = {
    picture: () => {
      if (this.data) {
        let args = new PicturePolygonArgs();
        args.id = this.data.ImageUrl;
        let value = new NameValue(args, this.data.Name);
        let paged = PagedList.create([value], 1, 1);
        this.picture.emit(paged);
      }
    },
  };
}
