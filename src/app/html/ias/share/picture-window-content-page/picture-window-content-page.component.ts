import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HowellPoint } from '../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { PictureWindowContentComponent } from '../picture-window-content/picture-window-content.component';

@Component({
  selector: 'ias-picture-window-content-page',
  imports: [CommonModule, PictureWindowContentComponent],
  templateUrl: './picture-window-content-page.component.html',
  styleUrl: './picture-window-content-page.component.less',
})
export class PictureWindowContentPageComponent {
  @Input() src?: string;
  @Input() id?: string;
  @Input() title: string = '';
  @Input() polygon: HowellPoint[] = [];
  @Input() zoom = true;
  @Input() page?: Page;
  @Output() pageChange = new EventEmitter<Page>();

  onprov(): void {
    if (this.page) {
      let page = new Page();
      page = Object.assign(page, this.page);
      page.PageIndex--;
      this.pageChange.emit(page);
    }
  }
  onnext(): void {
    if (this.page) {
      let page = new Page();
      page = Object.assign(page, this.page);
      page.PageIndex++;
      this.pageChange.emit(page);
    }
  }
}
