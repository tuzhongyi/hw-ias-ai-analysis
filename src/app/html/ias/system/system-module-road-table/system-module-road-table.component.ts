import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../../../../common/components/paginator/paginator.component';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { SystemModuleRoadTableBusiness } from './system-module-road-table.business';
import { SystemModuleRoadTableArgs } from './system-module-road-table.model';

@Component({
  selector: 'ias-system-module-road-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-module-road-table.component.html',
  styleUrl: './system-module-road-table.component.less',
  providers: [SystemModuleRoadTableBusiness],
})
export class SystemModuleRoadTableComponent implements OnInit, OnDestroy {
  @Input() args = new SystemModuleRoadTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadTableArgs>;
  @Output() modify = new EventEmitter<Road>();
  @Output() delete = new EventEmitter<Road>();
  @Output() error = new EventEmitter<Error>();

  constructor(private business: SystemModuleRoadTableBusiness) {}

  page = Page.create(1, 10);
  datas: Road[] = [];
  selected?: Road;
  widths = [];
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(this.page.PageIndex, this.page.PageSize, this.args);
      });
      this.subscription.add(sub);
    }
    this.load(this.page.PageIndex, this.page.PageSize, this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(index: number, size: number, args: SystemModuleRoadTableArgs) {
    this.business
      .load(index, size, args)
      .then((x) => {
        this.datas = x.Data;
        this.page = x.Page;
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  onpage(num: number) {
    if (this.args) {
      this.load(num, this.page.PageSize, this.args);
    }
  }
  onselect(item: Road) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  onmodify(item: Road, e: Event) {
    this.modify.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  ondelete(item: Road, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
