import { Component, Input } from '@angular/core';
import { HowellPoint } from '../../../../common/data-core/models/arm/point.model';
import { ContentHeaderComponent } from '../header/content-header/content-header.component';
import { PicturePolygonZoomComponent } from '../picture/picture-polygon-zoom/picture-polygon-zoom.component';

@Component({
  selector: 'ias-picture-window-content',
  imports: [ContentHeaderComponent, PicturePolygonZoomComponent],
  templateUrl: './picture-window-content.component.html',
  styleUrl: './picture-window-content.component.less',
})
export class PictureWindowContentComponent {
  @Input() src?: string;
  @Input() id?: string;
  @Input() title: string = '';
  @Input() polygon: HowellPoint[] = [];
  @Input() zoom = true;
}
