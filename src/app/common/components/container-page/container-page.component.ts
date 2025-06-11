import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../data-core/models/page-list.model';

@Component({
  selector: 'howell-container-page',
  imports: [CommonModule],
  templateUrl: './container-page.component.html',
  styleUrl: './container-page.component.less',
})
export class ContainerPageComponent {
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
