import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Page } from '../../../../../../../common/data-core/models/page-list.model';
import { ShopSignViewModel } from '../../../../../../../common/view-models/shop-sign/shop-sign.view-model';
import { SystemTaskResultSignTableBusiness } from './system-task-result-sign-table.business';
import {
  SystemTaskResultSignTableArgs,
  SystemTaskResultSignTableFilter,
} from './system-task-result-sign-table.model';

@Component({
  selector: 'ias-system-task-result-sign-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-task-result-sign-table.component.html',
  styleUrl: './system-task-result-sign-table.component.less',
  providers: [SystemTaskResultSignTableBusiness],
})
export class SystemTaskResultSignTableComponent implements OnInit, OnDestroy {
  @Input() args?: SystemTaskResultSignTableArgs;
  @Input('load') _load?: EventEmitter<SystemTaskResultSignTableArgs>;
  @Input() selected?: ShopSign;
  @Output() selectedChange = new EventEmitter<ShopSign>();
  @Input() index?: EventEmitter<number>;
  @Output() page = new EventEmitter<Page>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<ShopSign[]>();

  constructor(private business: SystemTaskResultSignTableBusiness) {}

  @ViewChild('body') body?: ElementRef<HTMLDivElement>;

  datas: ShopSignViewModel[] = [];
  widths: string[] = ['65px', 'auto', '85px', '60px', '120px', '85px', '80px'];
  loading = false;

  private filter = new SystemTaskResultSignTableFilter();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.index) {
      let sub = this.index.subscribe((index) => {
        this.selected = this.datas[index - 1];
        this.selectedChange.emit(this.selected);
        this.page.emit(Page.create(index, 1, this.datas.length));
        this.scroll(index - 1, this.datas.length);
      });
      this.subscription.add(sub);
    }
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x);
      });
      this.subscription.add(sub);
    }
    if (this.args) {
      this.load(this.args);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: SystemTaskResultSignTableArgs) {
    if (this.loading) return;
    this.loading = true;
    this.filter.load(args);
    this.business
      .load(this.filter)
      .then((x) => {
        this.datas = x;
        this.loaded.emit(x);
        if (this.datas.length > 0) {
          this.onselect(this.datas[0], 0);
        }
      })
      .catch((e) => this.error.emit(e))
      .finally(() => {
        this.loading = false;
      });
  }
  private scroll(index: number, size: number) {
    if (this.body) {
      this.body.nativeElement.scrollTop =
        this.body.nativeElement.scrollHeight * (index / size);
    }
  }

  onselect(item: ShopSign, index: number) {
    if (this.selected === item) {
      return;
    }
    this.selected = item;
    this.selectedChange.emit(item);
    this.page.emit(Page.create(index + 1, 1, this.datas.length));
  }
}
