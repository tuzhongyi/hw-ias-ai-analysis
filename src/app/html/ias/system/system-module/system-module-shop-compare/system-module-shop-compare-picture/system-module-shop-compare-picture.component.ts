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
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { PictureWindowContentPageComponent } from '../../../../share/picture-window-content-page/picture-window-content-page.component';

@Component({
  selector: 'ias-system-module-shop-compare-picture',
  imports: [CommonModule, PictureWindowContentPageComponent],
  templateUrl: './system-module-shop-compare-picture.component.html',
  styleUrl: './system-module-shop-compare-picture.component.less',
})
export class SystemModuleShopComparePictureComponent implements OnChanges {
  @Input() datas: string[] = [];
  @Input() index = 0;
  @Output() indexChange = new EventEmitter<number>();
  @Input() title: string = '';
  @Input() page?: Page;
  @Output() pageChange = new EventEmitter<Page>();

  constructor() {}

  picture = {
    selected: '',
    page: Page.create(1, 1, 2),
    change: (page: Page) => {
      this.picture.page = page;

      this.picture.selected = this.datas[page.PageIndex - 1];
      this.index = page.PageIndex;
      this.indexChange.emit(this.index);
    },
    load: () => {
      if (this.datas.length > 0) {
        this.picture.page = Page.create(this.index, 1, this.datas.length);
        this.picture.selected = this.datas[this.index - 1];
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.datas(changes['index']);
  }
  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.picture.load();
      }
    },
    index: (simple: SimpleChange) => {
      if (simple) {
        this.picture.load();
      }
    },
  };

  onprev() {
    if (this.page) {
      this.page.PageIndex--;
      this.pageChange.emit(this.page);
    }
  }
  onnext() {
    if (this.page) {
      this.page.PageIndex++;
      this.pageChange.emit(this.page);
    }
  }
}
