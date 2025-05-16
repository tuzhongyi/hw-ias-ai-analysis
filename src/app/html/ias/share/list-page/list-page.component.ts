import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../../../common/data-core/models/page-list.model';

@Component({
  selector: 'ias-list-page',
  imports: [CommonModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.less',
})
export class ListPageComponent {
  @Input() page?: Page;
  @Output() change = new EventEmitter<number>();

  onnext() {
    if (this.page && this.page.PageIndex < this.page.PageCount) {
      this.change.emit(++this.page.PageIndex);
    }
  }
  onprev() {
    if (this.page && this.page.PageIndex > 1) {
      this.change.emit(--this.page.PageIndex);
    }
  }
}
