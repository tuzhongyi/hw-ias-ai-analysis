import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContainerPageComponent } from '../../../../../common/components/container-page/container-page.component';
import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../common/data-core/models/page-list.model';
import { PicturePolygonZoomComponent } from '../picture-polygon-zoom/picture-polygon-zoom.component';

@Component({
  selector: 'ias-picture-list',
  imports: [CommonModule, PicturePolygonZoomComponent, ContainerPageComponent],
  templateUrl: './picture-list.component.html',
  styleUrl: './picture-list.component.less',
})
export class PictureListComponent {
  @Input() src?: string;
  @Input() id?: string;
  @Input() default?: string;
  @Input() polygon: HowellPoint[] = [];
  @Input() zoom = true;
  @Input() page?: Page;
  @Output() pageChange = new EventEmitter<Page>();

  on = {
    page: (page: Page) => {
      this.pageChange.emit(page);
    },
  };
}
