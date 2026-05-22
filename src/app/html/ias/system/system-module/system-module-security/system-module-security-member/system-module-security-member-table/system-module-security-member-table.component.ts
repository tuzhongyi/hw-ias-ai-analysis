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
import { PaginatorComponent } from '../../../../../../../common/components/paginator/paginator.component';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { Page } from '../../../../../../../common/data-core/models/interface/page-list.model';
import { TableSorterDirective } from '../../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { SystemModuleSecurityMemberTableBusiness } from './system-module-security-member-table.business';
import {
  SystemModuleSecurityMemberTableArgs,
  SystemModuleSecurityMemberTableFilter,
} from './system-module-security-member-table.model.ts';

@Component({
  selector: 'ias-system-module-security-member-table',
  imports: [CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-security-member-table.component.html',
  styleUrl: './system-module-security-member-table.component.less',
  providers: [SystemModuleSecurityMemberTableBusiness],
})
export class SystemModuleSecurityMemberTableComponent
  implements OnInit, OnDestroy
{
  @Input() args = new SystemModuleSecurityMemberTableArgs();
  @Input('load')
  input_load?: EventEmitter<SystemModuleSecurityMemberTableArgs>;

  @Output() details = new EventEmitter<DepartmentMember>();
  @Output() delete = new EventEmitter<DepartmentMember>();
  @Output() error = new EventEmitter<Error>();

  constructor(private business: SystemModuleSecurityMemberTableBusiness) {}

  widths = ['100px', 'auto', 'auto', 'auto', 'auto', 'auto', '100px'];
  minwidth = [];
  datas: (DepartmentMember | undefined)[] = [];
  page = Page.create(1, 10);
  selected?: DepartmentMember;

  Color = ColorTool;
  Language = Language;
  Math = Math;

  private filter = new SystemModuleSecurityMemberTableFilter();
  private subscription = new Subscription();

  private regist() {
    if (this.input_load) {
      let sub = this.input_load.subscribe((x) => {
        this.args = x;
        this.filter = SystemModuleSecurityMemberTableFilter.from(this.args);
        this.load(
          this.args.first ? 1 : this.page.PageIndex,
          this.page.PageSize,
          this.filter
        );
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
    this.filter = SystemModuleSecurityMemberTableFilter.from(this.args);
    this.load(1, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(
    index: number,
    size: number,
    filter: SystemModuleSecurityMemberTableFilter
  ) {
    this.business
      .load(index, size, filter)
      .then((x) => {
        this.page = x.Page;
        this.datas = x.Data;

        while (this.datas.length < this.page.PageSize) {
          this.datas.push(undefined);
        }
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  onselect(item?: DepartmentMember) {
    if (item) {
      if (this.selected === item) {
        this.selected = undefined;
      } else {
        this.selected = item;
      }
    }
  }

  on = {
    page: (index: number) => {
      this.load(index, this.page.PageSize, this.filter);
    },
    sort: (sort: Sort) => {
      this.filter.asc = undefined;
      this.filter.desc = undefined;
      if (sort.direction === 'asc') {
        this.filter.asc = sort.active;
      } else {
        this.filter.desc = sort.active;
      }
      this.load(this.page.PageIndex, this.page.PageSize, this.filter);
    },
    details: (item: DepartmentMember, e: Event) => {
      this.details.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    delete: (item: DepartmentMember, e: Event) => {
      this.delete.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
  };
}
