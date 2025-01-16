import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../common/tools/language';
import { SystemTaskResultShopTableBusiness } from './system-task-result-shop-table.business';
import {
  SystemTaskResultShopTableArgs,
  SystemTaskResultShopTableFilter,
} from './system-task-result-shop-table.model';

@Component({
  selector: 'ias-system-task-result-shop-table',
  imports: [CommonModule],
  templateUrl: './system-task-result-shop-table.component.html',
  styleUrl: './system-task-result-shop-table.component.less',
  providers: [SystemTaskResultShopTableBusiness],
})
export class SystemTaskResultShopTableComponent implements OnInit {
  @Input() args?: SystemTaskResultShopTableArgs;
  @Input('load') _load?: EventEmitter<SystemTaskResultShopTableArgs>;
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop>();
  @Input() index?: EventEmitter<number>;
  @Output() page = new EventEmitter<Page>();
  @Output() error = new EventEmitter<Error>();

  constructor(private business: SystemTaskResultShopTableBusiness) {}

  @ViewChild('body') body?: ElementRef<HTMLDivElement>;
  datas: Shop[] = [];
  filter = new SystemTaskResultShopTableFilter();
  widths: string[] = ['60px', 'auto', 'auto', '86px'];
  Language = Language;

  ngOnInit(): void {
    if (this.index) {
      this.index.subscribe((index) => {
        this.selected = this.datas[index - 1];
        this.selectedChange.emit(this.selected);
        this.page.emit(Page.create(index, 1, this.datas.length));
        this.scroll(index - 1, this.datas.length);
      });
    }
    if (this._load) {
      this._load.subscribe((x) => {
        this.load(x);
      });
    }
    if (this.args) {
      this.load(this.args);
    }
  }

  private load(args: SystemTaskResultShopTableArgs) {
    this.filter.load(args);
    this.business
      .load(this.filter)
      .then((x) => {
        this.datas = x;
        if (this.datas.length > 0) {
          this.onselect(this.datas[0], 0);
        }
      })
      .catch((e) => this.error.emit(e));
  }
  private scroll(index: number, size: number) {
    if (this.body) {
      this.body.nativeElement.scrollTop =
        this.body.nativeElement.scrollHeight * (index / size);
    }
  }

  onselect(item: Shop, index: number) {
    if (this.selected === item) {
      return;
    }
    this.selected = item;
    this.selectedChange.emit(item);
    this.page.emit(Page.create(index + 1, 1, this.datas.length));
  }
}
