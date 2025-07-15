import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import '../../../../assets/js/jquery/jquery-page/jquery.page.js';
import { Page } from '../../data-core/models/page-list.model';

declare var $: any;

@Component({
  selector: 'paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.less',
})
export class PaginatorComponent implements AfterViewInit, OnChanges {
  @Input() page = Page.create(1, 50, 50);
  @Input() jump = true;
  @Input() total = true;
  @Input() ungap = false;
  @Output() change = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'] && !changes['page'].firstChange) {
      if (this.element) {
        $(this.element.nativeElement).paging({
          pageNum: this.page.PageIndex, // 当前页面
          totalNum: this.page.PageCount, // 总页码
          totalList: this.page.TotalRecordCount, // 记录总数量
          callback: (num: number) => {
            this.change.emit(num);
          },
          display: {
            totalNum: this.total,
            totalList: this.total,
            jump: this.jump,
          },
        });
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.element) {
      $(this.element.nativeElement).paging({
        pageNum: this.page.PageIndex, // 当前页面
        totalNum: this.page.PageCount, // 总页码
        totalList: this.page.TotalRecordCount, // 记录总数量
        callback: (num: number) => {
          this.change.emit(num);
        },
        display: {
          totalNum: this.total,
          totalList: this.total,
          jump: this.jump,
        },
      });
    }
  }

  @ViewChild('paginator') element?: ElementRef<HTMLDivElement>;
}
