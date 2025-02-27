import { Component, Input } from '@angular/core';
import { Point } from '../../../../common/data-core/models/arm/point.model';
import { ContentHeaderComponent } from '../header/content-header/content-header.component';
import { PictureComponent } from '../picture/picture.component';

@Component({
  selector: 'ias-picture-window-content',
  imports: [ContentHeaderComponent, PictureComponent],
  templateUrl: './picture-window-content.component.html',
  styleUrl: './picture-window-content.component.less',
})
export class PictureWindowContentComponent {
  @Input() url?: string;
  @Input() title: string = '';
  @Input() polygon: Point[] = [];
  @Input() zoom = true;
}
