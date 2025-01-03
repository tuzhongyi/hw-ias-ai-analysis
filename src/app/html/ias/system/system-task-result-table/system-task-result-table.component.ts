import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../common/components/hw-select/select-control.component';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../common/tools/language';
import { SystemTaskResultTableSourceController } from './system-task-result-table-source.controller';
import { SystemTaskResultTableBusiness } from './system-task-result-table.business';
import { SystemTaskResultTableFilter } from './system-task-result-table.model';

@Component({
  selector: 'ias-system-task-result-table',
  imports: [CommonModule, FormsModule, HowellSelectComponent],
  templateUrl: './system-task-result-table.component.html',
  styleUrl: './system-task-result-table.component.less',
  providers: [
    SystemTaskResultTableSourceController,
    SystemTaskResultTableBusiness,
  ],
})
export class SystemTaskResultTableComponent {
  @Input('data') task?: AnalysisTask;
  @Input() selected?: ShopSign;
  @Output() selectedChange = new EventEmitter<ShopSign>();

  @Input('load') _load?: EventEmitter<number>;
  @Output() page = new EventEmitter<Page>();
  @Output() loaded = new EventEmitter<ShopSign[]>();

  constructor(
    private business: SystemTaskResultTableBusiness,
    public source: SystemTaskResultTableSourceController
  ) {}

  @ViewChild('body') body?: ElementRef<HTMLDivElement>;
  datas: ShopSign[] = [];
  widths: string[] = ['60px', 'auto', '85px', '60px', '80px', '120px'];
  filter = new SystemTaskResultTableFilter();
  Language = Language;

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((index) => {
        this.selected = this.datas[index - 1];
        this.selectedChange.emit(this.selected);
        this.page.emit(Page.create(index, 1, this.datas.length));
        this.scroll(index - 1, this.datas.length);
      });
    }
    if (this.task) {
      this.filter.taskId = this.task.Id;
      this.load(this.filter);
    }
  }

  private scroll(index: number, size: number) {
    if (this.body) {
      this.body.nativeElement.scrollTop =
        this.body.nativeElement.scrollHeight * (index / size);
    }
  }

  private load(filter: SystemTaskResultTableFilter) {
    this.business.load(filter).then((x) => {
      this.datas = x;
      this.datas.sort((a, b) => LocaleCompare.compare(a.Time, b.Time));
      this.loaded.emit(this.datas);
      if (this.datas.length > 0) {
        this.onselect(this.datas[0], 0);
      }
    });
  }

  onselect(item: ShopSign, index: number) {
    if (this.selected === item) {
      return;
    }
    this.selected = item;
    this.selectedChange.emit(item);
    this.page.emit(Page.create(index + 1, 1, this.datas.length));
  }

  onfilter() {
    this.load(this.filter);
  }
}
