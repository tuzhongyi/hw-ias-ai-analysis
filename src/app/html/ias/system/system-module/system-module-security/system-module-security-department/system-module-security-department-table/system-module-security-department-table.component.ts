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
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { Page } from '../../../../../../../common/data-core/models/interface/page-list.model';
import { TableSorterDirective } from '../../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { SystemModuleSecurityDepartmentTableBusiness } from './system-module-security-department-table.business';
import {
  DepartmentModel,
  SystemModuleSecurityDepartmentTableArgs,
  SystemModuleSecurityDepartmentTableFilter,
} from './system-module-security-department-table.model';

@Component({
  selector: 'ias-system-module-security-department-table',
  imports: [CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-security-department-table.component.html',
  styleUrl: './system-module-security-department-table.component.less',
  providers: [SystemModuleSecurityDepartmentTableBusiness],
})
export class SystemModuleSecurityDepartmentTableComponent
  implements OnInit, OnDestroy
{
  @Input() args = new SystemModuleSecurityDepartmentTableArgs();
  @Input('load')
  input_load?: EventEmitter<SystemModuleSecurityDepartmentTableArgs>;

  @Output() details = new EventEmitter<Department>();
  @Output() delete = new EventEmitter<Department>();
  @Output() error = new EventEmitter<Error>();

  constructor(private business: SystemModuleSecurityDepartmentTableBusiness) {}

  widths = [
    '100px',
    'auto',
    '10%',
    '10%',
    '10%',
    'auto',
    '10%',
    '10%',
    '100px',
  ];
  minwidth = [];
  datas: (DepartmentModel | undefined)[] = [];
  page = Page.create(1, 10);
  selected?: Department;

  Color = ColorTool;
  Language = Language;
  Math = Math;

  private filter = new SystemModuleSecurityDepartmentTableFilter();
  private subscription = new Subscription();

  private regist() {
    if (this.input_load) {
      let sub = this.input_load.subscribe((x) => {
        this.args = x;
        this.filter = SystemModuleSecurityDepartmentTableFilter.from(this.args);
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
    this.filter = SystemModuleSecurityDepartmentTableFilter.from(this.args);
    this.load(1, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(
    index: number,
    size: number,
    filter: SystemModuleSecurityDepartmentTableFilter
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

  onselect(item?: Department) {
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
    details: (item: Department, e: Event) => {
      this.details.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
    delete: (item: Department, e: Event) => {
      this.delete.emit(item);
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }
    },
  };
}
