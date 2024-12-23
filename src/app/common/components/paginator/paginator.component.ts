import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import '../../../../assets/js/jquery/jquery-page/jquery.page.js';
import { Page } from '../../data-core/models/page-list.model';

declare var $: any;

@Component({
  selector: 'paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.less',
})
export class PaginatorComponent implements AfterViewInit {
  @Input() page = Page.create(1, 50, 50);
  @Output() change = new EventEmitter<number>();

  ngAfterViewInit(): void {
    if (this.element) {
      $(this.element.nativeElement).paging({
        pageNum: this.page.PageIndex, // 当前页面
        totalNum: this.page.PageCount, // 总页码
        totalList: this.page.TotalRecordCount, // 记录总数量
        callback: (num: number) => {
          this.change.emit(num);
        },
      });
    }
  }

  @ViewChild('paginator') element?: ElementRef<HTMLDivElement>;
}
